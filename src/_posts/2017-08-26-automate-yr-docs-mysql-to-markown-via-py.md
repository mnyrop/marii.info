---
layout: post
title:  "Automate docs for DB updates with Pandas + Markdown"
time_period: 2017
overlay: blue
img: 'https://nsarchive2.gwu.edu/NSAEBB/NSAEBB601-British-appealed-to-US-in-1952-for-coup-against-Mosaddeq-in-Iran/images/1.jpg'
tags: documentation; myql; python; markdown
---

As part of my gig as the DH developer for Columbia University Libraries, I've become the data steward of the [Foreign Relations of the United States](https://history.state.gov/historicaldocuments/about-frus) (FRUS) collection for the  [History Lab](https://history-lab.org/) project.

This means that, as newly declassified and processed FRUS volumes are released by the State Department as [XML files](https://github.com/HistoryAtState/frus/tree/master/volumes), it's my job to re-process the collection with the newly added volumes, ingest the processed data into to our MySQL database, and make sure the metadata connecting the volumes to History_Lab's own bleeding edge [topic modeling and named-entity recognition (NER)](https://history-lab.org/documentation/) is preserved for further research.

In practice, this means I need to: regenerate the data as a brand new, 'update' database, copy over a select number of tables containing the additional data that History_Lab has produced, and test the fidelity of the new database before passing it up the chain of command.

Because of the enormity of the collection (~300K documents and growing!), manual sanity checks and documentation workflows just aren't cutting it. To address these issues, I spent some time making the ingestion scripts themselves a bit smarter and more verbose, then turned to questions of documentation, including:

***How do i automate all these `DESCRIBE table;`, `SELECT * FROM table LIMIT 5;`, and `SELECT COUNT(*) FROM table` SQL queries in a reproducible, shareable, easy to read way?***

Below is the best response I've been able to provide for that question. It's a Python script that **connects to both the production database and the update database created by the ingestion process.** It then extracts information about the databases in the form of Pandas dataframes and **writes a Markdown report of the ingestion results, including:**

- **a list of tables that were dropped** (i.e. tables present in the production db but not in the update db)
- **the % change in rowcount** (between the production tables and their update counterparts), and
- **at-a-glance previews** (first 5 rows) of each updated table.

Because I included this script directly in the ingestion pipeline, the markdown report is automatically generated on ingest and needs only to be pushed to my repository's `documentation` directory after the process is complete.

### the .cnf file

*<sup>(You can learn more about .cnf option files [here](https://dev.mysql.com/doc/refman/5.7/en/option-files.html).)</sup>*

```
[client]
user= # your mysql username
password= # your mysql password
host= # your mysql host (url or localhost)
```

### the main script
*<sup>(aka `results.py` or something similar)</sup>*

```python
# get necessary modules
import os
import sys
import pymysql
import pandas as pd
import ConfigParser
import datetime
import codecs
from pandas.api.types import is_string_dtype

# relative path to your mysql login .cnf file
conf_path = "common/mylogin.cnf" # path to your root dir for finding

# output vars
report_title = "FRUS Collection Ingest Update"
file_prefix = "FRUS-ingest-results"

# pick which dbs to compare
update_name = "frus_update"
prod_name = "frus"

# parse config for connecting to dbs
config = ConfigParser.RawConfigParser()
config.readfp(open(os.path.join(conf_path)))
db_user = config.get('client', 'user')
db_pass = config.get('client', 'password')
db_host = config.get('client', 'host')

# connect to dbs
prod_db = connect_db(prod_name)
update_db = connect_db(update_name)

# get list of tables in each db
prod_tables = show_tables(prod_db)
update_tables = show_tables(update_db)

# get lists of common and missing tables
common_tables = common_tables(prod_tables, update_tables)
missing_tables = missing_tables(prod_tables, common_tables)

# construct the info to report
h1 = "# " + report_title + " — " + datetime.datetime.now().strftime("%m-%d-%Y") + "\n\n\n"
missing_table_list = format_list("tables dropped on update", missing_tables)
rowcount_changes = "### `" + prod_name + "` vs `" + update_name + "`\n\n" + markdown_table(rowcount_changes(common_tables, prod_db, update_db)) + "\n\n\n"
formatted_previews = formatted_previews(update_name, update_db, common_tables)

# concatenate report info as a single string
file_as_string = h1 + missing_table_list + rowcount_changes + update_previews

# write string to filepath
filepath = file_prefix +"-" + datetime.datetime.now().strftime("%m-%d-%Y") + ".md"
print "Writing results of ingestion to " + filepath + "..."
try:
    os.remove(filepath)
except OSError:
    pass
f = codecs.open(filepath, encoding='utf-8', mode="w+")
f.write(unicode(file_as_string,'utf-8'))

```

### multi-purpose methods

*<sup>(Add the following methods before the config section of the main script, or put them in another file like `helpers.py` to be imported as a local module.)</sup>*

```python

def connect_db(db_name): # takes a database name, returns a db connector
  return pymysql.connect(host=db_host, user=db_user, passwd=db_pass, db=db_name, charset='utf8')

def show_tables(db): # takes a db connector, returns an array table names
  df = pd.read_sql("SHOW TABLES;", con=db)
  return list(df[str(df.columns[0])].astype(str))

def df(db, table): # takes a db connector and a table name, and returns a pandas dataframe from that table
  return pd.read_sql("SELECT * FROM " + table + ";", con=db)

def df_sample(db, table, limit): # same as df(), but only returns a sample of LIMIT # of rows
  return pd.read_sql("SELECT * FROM " + table + " LIMIT " + str(limit) + ";", con=db)

def df_rowcount(db, table): # takes a db connector and a table name, and returns a the rowcount (int) of that table
  return pd.read_sql('SELECT COUNT(*) FROM ' + table + ';', con=db)['COUNT(*)'][0]

def markdown_table(df): # takes a pandas dataframe and tur it into returns it as a (string) markdown table
  df_fmt = pd.DataFrame([fmt], columns=df.columns)
  df_formatted = pd.concat([df_fmt, df])
  return df_formatted.to_csv(sep="|", index=False, encoding='utf-8', quotechar="*")

def rowcount_changes(shared_tables, db1, db2): # takes a list of common tables and both db connectors, returns a (string) markdown table representing the changes
  cols = ['table','production db rowcount','update db rowcount','% difference']
  differential_df = pd.DataFrame(columns=cols)

  for table in shared_tables:
    db1_rowcount = df_rowcount(db1, table)
    db2_rowcount = df_rowcount(db2, table)

    difference = db2_rowcount - db1_rowcount
    if difference != 0:
        difference = (difference / db1_rowcount) * 100

    temp_df = pd.DataFrame([["`" + table + "`", prod_count, update_count, difference]], columns=cols)

    differential_df = differential_df.append(temp_df, ignore_index=True)
    differential_df['production db rowcount'] = differential_df['production db rowcount'].astype(int)
    differential_df['update db rowcount'] = differential_df['update db rowcount'].astype(int)
    differential_df['% difference'] = differential_df['% difference']

  return differential_df

def formatted_previews(db_name, db, tables): # takes a db name, db connector, and list of tables, returns a string representation of previews for each table in that db
    all_tables_string = "### `" + db_name + " ` preview \n\n"
    for table in tables:
        df_head = df_sample(db,table,5)
        for col in df_head.columns:
            if is_string_dtype(df_head[col]):
                df_head[col] = df_head[col].str[:200].replace('\n',' ', regex=True)
        all_tables_string += "#### `" + table + "`\n\n" + markdown_table(df_head) + "\n\n"
    return all_tables_string

def common_tables(table_list1, table_list2): # takes lists of tables, returns list of tables present in both lists
  common = list(set(table_list1) & set(table_list2))
  common.sort()
  return common

def missing_tables(table_list1, common_table_list): # returns array of table names in table list that aren't in the common list
  missing = [x for x in prod_tables if x not in common_tables]
  missing.sort()
  return missing

def format_list(heading, list): # returns md formatted list w h3 heading
  list_string = "###" + heading: + " \n"
  for item in list:
      list_string += "- " + item + "\n"
  return list_string + "\n\n\n"

```

{% comment %}## Results (excerpt):

*<sup>(The real report is __much__ longer than this, and would be way more tedious to produce manually!)</sup>*{% endcomment %}




### Final thoughts:

I'm hoping to implement this style of automated documentation across History_Lab's various collection ingestion pipelines. The goal is not only to create standardized, thorough system for documentation, but also to better understand changes to the collection over time and anticipate possible issues.

After several ingestion reports on are generated per collection, I'm hoping to apply insights from them in making the ingestion scripts themselves much smarter—for example by flagging when table row counts change in unexpected ways.
