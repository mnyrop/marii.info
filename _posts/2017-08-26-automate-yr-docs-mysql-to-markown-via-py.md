---
layout: post
title:  "Peak Laziness:<br>Automate documentation for database updates with Python, Pandas and Markdown"
date: 2017-09-14
category: dev
sticky: true
tags:
  - markdown
  - data-science
  - python
  - pandas
---

As part of my appointment with Columbia University Libraries, I've recently become the steward of the [Foreign Relations of the United States](https://history.state.gov/historicaldocuments/about-frus) (FRUS) collection processing pipeline for [History Lab](http://history-lab.org/). When new FRUS volumes are released by the State Department as [XML files](https://github.com/HistoryAtState/frus/tree/master/volumes), it's now my job to re-process and ingest the collection into to our MySQL database, and make sure the data connecting the volumes to History_Lab's own bleeding edge [topic modeling and named-entity recognition (NER)](http://www.history-lab.org/documentation) is preserved for further research.

Because of the enormity of the collection (~250K documents!), manual sanity checks and documentation processes just aren't cutting it. To address these issues, I spent some time making the ingestion script a bit smarter and more verbose, then turned to the question of documentation—namely:

***How do i automate all these `DESCRIBE table;`, `SELECT * FROM table LIMIT 5;`, and `SELECT COUNT(*) FROM table` SQL queries in a reproducible, easy to read way?***

Below is the best response I've been able to provide for that question. It's a Python script that **reads in the production database and the update database created by the ingestion process.** It then extracts information about them in the form of Pandas dataframes and **writes a Markdown report including: a list of tables that were dropped, changes in row count for each table, and previews (first 5 rows) of each updated table.**

Since I included the script directly in the ingestion pipeline, the markdown report is automatically generated on ingest and needs only to be pushed to my repository's `documentation` directory after the process is complete.


```python
import os
import sys
import pymysql
import pandas as pd
import ConfigParser
import datetime
import codecs
from pandas.api.types import is_string_dtype

conf_path = "common/mylogin.cnf" # path to your root dir for finding

# get config to connect to local dbs
config = ConfigParser.RawConfigParser()
config.readfp(open(os.path.join(conf_path)))
db_user = config.get('client', 'user')
db_pass = config.get('client', 'password')
db_host = config.get('client', 'host')

# pick which dbs to compare
update_name = "frus_update"
prod_name = "frus"

report_title = "FRUS Collection Ingest Update"
file_prefix = "FRUS-ingest-results"

# connect to dbs
prod_db = connect_db(prod_name)
update_db = connect_db(update_name)

# get list of tables in each db
prod_table_list = show_tables(prod_db)
update_table_list = show_tables(update_db)

# get lists of common and missing tables
common_tables = common_tables(prod_table_list, update_table_list)
missing_tables = missing_tables(prod_table_list, common_tables)

# info to report
h1 = "# " + report_title + " — " + datetime.datetime.now().strftime("%m-%d-%Y") + "\n\n\n"
missing_tables = format_list("tables dropped on update", missing_tables)
rowcount_changes = "### `" + prod_name + "` vs `" + update_name + "`\n\n" + markdown_table(rowcount_changes(common_tables, prod_db, update_db)) + "\n\n\n"
update_previews = update_previews(update_name, update_db, common_tables)

# concat report info as string
file_as_string = h1 + missing_tables + rowcount_changes + update_previews

# where to write it and what to name it (with date appended)
filepath = file_prefix +"-" + datetime.datetime.now().strftime("%m-%d-%Y") + ".md"

print "Writing results of ingestion to " + filepath + "..."
try:
    os.remove(filepath)
except OSError:
    pass

f = codecs.open(filepath, encoding='utf-8', mode="w+")
f.write(unicode(file_as_string,'utf-8'))

```

## methods

*(Add before config or put in another file and import as a local module.)*

```python

def connect_db(db_name):
  return pymysql.connect(host=db_host, user=db_user, passwd=db_pass, db=db_name, charset='utf8')

def show_tables(db):
  df = pd.read_sql("SHOW TABLES;", con=db)
  return list(df[str(df.columns[0])].astype(str))

def df(db, table):
  return pd.read_sql("SELECT * FROM " + table + ";", con=db)

def df_sample(db, table, limit):
  return pd.read_sql("SELECT * FROM " + table + " LIMIT " + str(limit) + ";", con=db)

def df_rowcount(db, table):
  return pd.read_sql('SELECT COUNT(*) FROM ' + table + ';', con=db)['COUNT(*)'][0]

def markdown_table(df):
  fmt = ['---' for i in range(len(df.columns))]
  df_fmt = pd.DataFrame([fmt], columns=df.columns)
  df_formatted = pd.concat([df_fmt, df])
  return df_formatted.to_csv(sep="|", index=False, encoding='utf-8', quotechar="*")

def rowcount_changes(shared_tables, db1, db2):
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

def formatted_previews(db_name, db, tables):
    all_tables_string = "### `" + db_name + " ` preview \n\n"
    for table in tables:
        df_head = pd.read_sql('SELECT * FROM ' + table + ' LIMIT 5;', con=db)
        for col in df_head.columns:
            if is_string_dtype(df_head[col]):
                df_head[col] = df_head[col].str[:200].replace('\n',' ', regex=True)
        all_tables_string += "#### `" + table + "`\n\n" + markdown_table(df_head) + "\n\n"
    return all_tables_string

def common_tables(table_list1, table_list2):
  common = list(set(table_list1) & set(table_list2))
  common.sort()
  return common

def missing_tables(table_list1, common_table_list):
  missing_tables = [x for x in prod_table_list if x not in common_tables]
  missing_tables.sort()

def format_list(heading, list):
  missing_string = "###" + heading: + " \n"
  for item in list:
      missing_string += "- " + item + "\n"
  missing_string += "\n\n\n"

```

## Results (excerpt):

*(The real report is much longer than this, and would be way more tedious to produce manually!)*

<script src="https://gist.github.com/mnyrop/4d50065321edd0d445c7e66eed9483b6.js"></script>


## Final thoughts:

I'm hoping to implement this style of automated documentation across History_Lab's various collection ingestion pipelines. The goal is not only to create standardized, thorough documentation, but also to better understand changes to the collection over time and anticipate possible issues.

After several ingestion reports on are generated per collection, I'm hoping to apply insights from them in making the ingestion scripts themselves much smarter—possibly by flagging when table row counts change in unexpected ways.
