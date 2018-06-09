---
layout: post
title:  "Create a Gov't Document Pipeline from Scraping through Full Text Extraction"
date: 2017-11-09
hero: '/images/asad.png'
overlay: purple
tags:
  - cia
  - beautifulsoup
  - python
  - tesseract
  - ocr
---

# Steps:

1. Scrape and save metadata with Python
2. Scrape and download .pdfs to local directory with Python
3. Convert .pdfs to .tifs with ImageMagick
4. Extract raw text from .tifs using Tesseract OCR
5. Connect raw text to metadata (in a static format like csv or in a database)

## cia-scraper.python&#172;

```python
from bs4 import BeautifulSoup
from os.path import expanduser
import os
from tqdm import tqdm
import pandas as pd
import requests
import urllib2
import time
import lxml

BASEURL = "https://www.cia.gov"
PAGINATE_PATH ="/library/readingroom/collection/scientific-abstracts?page="
PDF_DIR = expanduser("~") + "/cia_pdfs/"
RANGE = 1654 # pages, of 20 docs per page
TEST_RANGE = 10
SKIPPED_FILES = []

def retrieve_file(url, name):
  filepath = PDF_DIR + name + ".pdf"
  if not os.path.exists(PDF_DIR):
    os.makedirs(PDF_DIR)

    try:
      response = urllib2.urlopen(url)
      with open(filepath, 'w+') as f:
        f.write(response.read())
        f.close()
    except urllib2.URLError as e:
      print ('WiFi connection perhaps lost !! Trying one more time...')
      try:
        response = urllib2.urlopen(url)
        with open(filepath, 'w+') as f:
          f.write(response.read())
          f.close()
      except:
        print ('WiFi connection really lost !! Bailing out..')
        print (e)
        SKIPPED_FILES.append(name)

def meta_df(download_bool):
  df = pd.DataFrame(columns=['id','title','classification','publication_date'])
  idx = 0

  for i in tqdm(xrange(TEST_RANGE)):

    pagination_link = BASEURL + PAGINATE_PATH + str(i)
    pagination_page = requests.get(pagination_link)
    p_soup = BeautifulSoup(pagination_page.content, 'lxml')

    for doc_title in p_soup.find_all("h4", class_="field-content"):

      a = doc_title.select_one("a")
      link = str(a.get('href'))
      TITLE = str(a.string or "")

      doc_page = requests.get(BASEURL + link)
      m_soup = BeautifulSoup(doc_page.content, 'lxml')
      time.sleep (.05)

      try:
        PUB_DATE = m_soup.select_one(".field-name-field-pub-date").select_one("span").get('content')
      except:
        PUB_DATE = ""
      try:
        ID = m_soup.select_one(".field-name-field-document-number").select_one(".field-item").string
      except:
        ID = ""
      try:
        CLASSIFICATION = m_soup.select_one(".field-name-field-original-classification").select_one(".field-item").string
      except:
        CLASSIFICATION = ""

      if download_bool:
        PDF = m_soup.select_one(".file").select_one("a").get('href')
        retrieve_file(PDF, ID)

    df.loc[idx] = [ID, TITLE, CLASSIFICATION, PUB_DATE]
    idx+=1  

  return df

df = meta_df(True)
```





## tif-convert.sh&#172;

```bash
TIF_DIR="tif"

if [ ! -d "${TIF_DIR}" ];
then
  mkdir ${TIF_DIR}
fi

for PAGE in *.pdf; do
  TIF_NAME=$(basename ${PAGE} .pdf).tif
  gs -q -dNOPAUSE -sDEVICE=tiffg4 -sOutputFile=${TIF_NAME} ${PAGE} -c quit
  mv ${TIF_NAME} ${TIF_DIR}
  echo "Converted ${TIF_NAME}"
done

mv ${TIF_DIR} ..
```


## tesseract.sh &#172;

```bash
TXT_DIR="texts"

if [ ! -d "${TXT_DIR}" ];
then
  mkdir ${TXT_DIR}
fi

for TIF in *.tif; do
  TXT_NAME=$(basename ${TIF} .tif)
  TXT_FILE="${TXT_NAME}.txt"
  tesseract ${TIF} ${TXT_NAME}
  mv ${TXT_FILE} ${TXT_DIR}
  echo "Converted ${TXT_NAME}"
done

mv ${TXT_DIR} ..
```
