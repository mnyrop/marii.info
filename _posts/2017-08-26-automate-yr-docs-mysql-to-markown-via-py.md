---
layout: post
title:  "Peak Laziness:<br>Automated database documentation with Python, Pandas and Markdown"
date: 2017-09-14
category: dev
sticky: true
tags:
  - markdown
  - data-science
  - python
  - pandas
---

As part of my appointment with Columbia University Libraries, I've recently become the steward of the [Foreign Relations of the United States]() (FRUS) collection processing pipeline for [History Lab](). When new FRUS volumes are release by the State Department as XML files, it's now my job to re-process and ingest the collection into to our MySQL database, and make sure the data connecting the volumes to History_Lab's bleeding edge [topic modeling]() and [named-entity recognition]() is preserved for further research.

Because of the enormity of the collection (~250K documents!), manual sanity checks and documentation processes just aren't cutting it. To address these issues, I spent some time making the ingestion script a bit smarter and more verbose, then turned to the question of documentation—namely: How do i automate all these `DESCRIBE table;`, `SELECT * FROM table LIMIT 5;`, and `SELECT COUNT(*) FROM table` SQL queries in a reproducible, easy to read way?

Below is the best answer I've been able to provide for that question. It's a **Python** script that reads in the production (current) database and the update database, extracts information about them in the form of **Pandas** dataframes, and writes a Markdown report file showcasing that information, including: which tables were dropped, the changes in row count for each table, and previews (first 5 rows) of each updated table. Since the script is included directly in the ingestion pipeline, the **markdown** report is automatically generated and needs only to be pushed to my repository's `documentation` directory for future reference.


```python
import os
import sys
import pymysql
import pandas as pd
import ConfigParser
import datetime
import codecs
from pandas.api.types import is_string_dtype

# pick which dbs to compare
update_db_name = "frus_update"
prod_db_name = "frus"

# location for local mysql login credentials
config_path = "../../common/config/.mylogin.cnf"

# get config to connect to local dbs
config = ConfigParser.RawConfigParser()
config.readfp(open(r''+config_path))
db_user = config.get('client', 'user')
db_pass = config.get('client', 'password')

# connect to dbs
update_db = pymysql.connect(host='localhost', user=db_user, passwd=db_pass, db=update_db_name, charset='utf8')
prod_db = pymysql.connect(host='localhost', user=db_user, passwd=db_pass, db=prod_db_name, charset='utf8')

# get list of tables in each db
update_table_list = pd.read_sql('SHOW TABLES;', con=update_db)['Tables_in_' + update_db_name].str.encode('utf-8')
prod_table_list = pd.read_sql('SHOW TABLES;', con=prod_db)['Tables_in_' + prod_db_name].str.encode('utf-8')

# get list of common tables
common_tables = list(set(update_table_list) & set(prod_table_list))
common_tables.sort()

# get list of dropped tables
missing_tables = [x for x in prod_table_list if x not in common_tables]
missing_tables.sort()

def markdown_table(df):
    fmt = ['---' for i in range(len(df.columns))]
    df_fmt = pd.DataFrame([fmt], columns=df.columns)
    df_formatted = pd.concat([df_fmt, df])
    return df_formatted.to_csv(sep="|", index=False, encoding='utf-8', quotechar="*")

def rowcount_changes(tables):
    cols = ['table','production db rowcount','update db rowcount','% difference']
    differential_df = pd.DataFrame(columns=cols)

    for table in tables:
        exec("temp_update = pd.read_sql('SELECT COUNT(*) FROM ' + table + ';', con=update_db)")
        exec("temp_prod = pd.read_sql('SELECT COUNT(*) FROM ' + table + ';', con=prod_db)")

        exec("update_count = temp_update['COUNT(*)'][0]")
        exec("prod_count = temp_prod['COUNT(*)'][0]")


        difference = update_count - prod_count
        if difference != 0:
            difference = (difference / prod_count) * 100

        temp_df = pd.DataFrame([["`" + table + "`", prod_count, update_count, difference]], columns=cols)
        differential_df = differential_df.append(temp_df, ignore_index=True)
        differential_df['production db rowcount'] = differential_df['production db rowcount'].astype(int)
        differential_df['update db rowcount'] = differential_df['update db rowcount'].astype(int)
        differential_df['% difference'] = differential_df['% difference']

    return differential_df

def update_previews(tables):
    all_tables_string = "### `" + update_db_name + "` preview\n\n"
    for table in tables:
        exec("df_head = pd.read_sql('SELECT * FROM ' + table + ' LIMIT 5;', con=update_db)")
        for col in df_head.columns:
            if is_string_dtype(df_head[col]):
                df_head[col] = df_head[col].str[:200].replace('\n',' ', regex=True)
        all_tables_string += "#### `" + table + "`\n\n" + markdown_table(df_head) + "\n\n"
    return all_tables_string

def missing_list(tables):
  missing_string = "### tables dropped on update: \n"
  for table in tables:
      missing_string += "- " + table + "\n"
  missing_string += "\n\n\n"
  return missing_string

# info to report
header = "# FRUS Collection Ingest Update — " + datetime.datetime.now().strftime("%m-%d-%Y") + "\n\n\n"
missing = missing_list(missing_tables)
changes = "### `" + prod_db_name + "` vs `" + update_db_name + "`\n\n" + markdown_table(rowcount_changes(common_tables)) + "\n\n\n"
updates = update_previews(common_tables)


# concat report info as string
file_as_string = header + missing + changes + updates

# where to write it and what to name it (with date appended)
filepath = "../FRUS-ingest-results-" + datetime.datetime.now().strftime("%m-%d-%Y") + ".md"

print "Writing results of ingestion to " + results_filepath + "..."
try:
    os.remove(filepath)
except OSError:
    pass

f = codecs.open(filepath, encoding='utf-8', mode="w+")
f.write(unicode(file_as_string,'utf-8'))

```

## Results (excerpt):

  # FRUS Collection Ingest Update — 08-31-2017

  ### tables dropped on update:
  - old_topics
  - topics_staging
  - countries_bak

  ### `frus` vs `frus_update`

  table|production db rowcount|update db rowcount|% difference
  ---|---|---|---
  `authorship`|20511|20511|0.0
  `classification_countries`|612|612|0.0
  `classification_doc`|52580|56018|7.0
  `classification_persons`|12288|13075|6.0
  `classifications`|4|3|-25.0
  `countries`|282|282|0.0
  `country_doc`|760310|760310|0.0
  `doc_counts`|731|851|16.0
  `docs`|209046|233683|12.0
  `person_doc`|346596|354813|2.0
  `persons`|16312|16312|0.0
  `refs`|2963|3029|2.0
  `term_doc`|315434|328470|4.0
  `terms`|11412|58463|412.0
  `top_classifications`|3|3|0.0
  `top_countries`|242|242|0.0
  `top_persons`|10103|10127|0.0
  `top_topics`|100|100|0.0
  `topic_doc`|489480|489480|0.0
  `topics`|100|100|0.0
  `volumes`|375|411|10.0



  ### `declassification_fus_update` preview


  #### `countries`

  id|name|deleted|official
  ---|---|---|---
  004|Afghanistan|0.0|1.0
  008|Albania|0.0|1.0
  010|Antarctica|0.0|1.0
  012|Algeria|0.0|1.0
  016|American Samoa|0.0|1.0


  #### `persons`

  id|name|birth_year|description
  ---|---|---|---|---
  100001|Aaron, David Laurence|1938|President’s Deputy Assistant for National Security Affairs from 1977 until 1981; Deputy Assistant to the President for National Security Affairs; Deputy Assistant to the President for National Security Affairs from 1977 until 1981; senior member, National Security Council staff, until 1974; legislat
  100002|Aaron, Harold R.||Major General, USA; Assistant Chief of Staff, Intelligence
  100003|Abaydi, Haamid al-||Libyan Defense Minister until September 1969
  100004|Abbas, Ferhat||Prime Minister of the Provisional Government of the Algerian Republic from September 1958; Algerian nationalist leader; Secretary General of the Union Démocratique du Manifeste Algérien (Democratic Union of the Algerian Manifesto) (UDMA).
  100005|Abbas, M. M.||Director General for Americas and Europe, Ministry of Foreign Affairs,Pakistan


  #### `terms`

  id|acronym|def
  ---|---|---
  frus1917-72PubDip#t_AEF_1|AEF|American Expeditionary Forces
  frus1917-72PubDip#t_CPI_1|CPI|Committee on Public Information
  frus1917-72PubDip#t_Col_1|Col.|Colonel
  frus1917-72PubDip#t_Compub_1|Compub|Committee on Public Information
  frus1917-72PubDip#t_GHQ_1|GHQ|general headquarters


  #### `top_classifications`

  id|title|doc_count
  ---|---|---
  1|Confidential|14000
  2|Secret|32298
  3|Top Secret|9720



  #### `topics`

  id|title|name
  ---|---|---
  1001|{gulf, relief, aware}|British Withdrawal from Gulf
  1002|{israel, israeli, asia}|Early Israeli Security Problems
  1003|{nixon, look, broadcast}|Chinese Sovereignty in Tibet
  1004|{romania, romanian, always}|Detente with Romania
  1005|{panama, fund, panamanian}|Panama Canal Negotiations
