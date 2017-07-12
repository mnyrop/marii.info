---
layout: post
title: The Summer of Japanese Puppets, Part 2
date: 2017-07-11
---
<br/>
<img src="http://www.columbia.edu/cgi-bin/dlo?obj=ldpd_bun_slide_493_2_0779_0826&size=medium" style="box-shadow: 2px 2px 4pc #23352a;"/>
<br/><br/>

This post is part 2 of 4 in a series. Feel free to skip around to:<br/><br/>__[part 1: the task](the-summer-of-puppets)__,<br/>__[part 3: the site](the-summer-of-puppets-3)__, or<br/>__[part 4: epilogue](the-summer-of-puppets-4)__.

<hr/>

# Act 2: Data transformation montage

After taking a detour prototyping with [Google Lovefield](https://google.github.io/lovefield/) + [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) and making a pitstop to play with [GraphQL](http://graphql.org/), I finally settled on a simpler plan: to export each data type as an array of JSON records, and have each record point to its relationships with arrays of IDs. With this, the montage began:

## scene i. plan + tidy

#### In: <span style="font-weight:400">MySQL dump</span><br/>Tools: <span style="font-weight:400">[OpenRefine](http://openrefine.org/) / [json-schema](http://json-schema.org/)</span>

I started by using a spreadsheet and [JSON Schema](http://json-schema.org/) to plan out what each data type (e.g. play, kashira, character, etc.) should look like at the end of the processing stage by asking/answerinq questions like: _Which keys does each type need? Which keys should be named in a standardized way across data types? What kind of value does a given key expect, and does it expect 1 or many?_

<br/><img src="{{ "/images/bunraku_type_model.png" | relative_url }}" style="box-shadow: 2px 2px 4pc #23352a;max-width:600px;"/><br/><br/>

Once each type was reasonably mapped out, I exported the MySQL database as a set of CSV files and turned to [OpenRefine](http://openrefine.org/) (formerly known as GoogleRefine) to clean them up. I used faceting to get a better sense of each data type, recast strings as ints and visa versa, scrubbed out line breaks, dropped unused columns, consolidated similar cells, and so on. Then I renamed as many columns as possible to cohere to the somewhat-standardized JSON schema I'd created, and re-exported them as spiffed-up CSVs.

<br/><img src="{{ "/images/open-refine.png" | relative_url }}" style="box-shadow: 2px 2px 4pc #23352a;max-width:600px;"/><br/><br/>

#### Out: <span style="font-weight:400">[Optimized CSVs](https://github.com/mnyrop/bunraku-ipy/tree/master/in)</span>

<br/>


## scene ii. Process + convert to JSON

#### In: <span style="font-weight:400">[CSVs](https://github.com/mnyrop/bunraku-ipy/tree/master/in)</span><br/>Tools: <span style="font-weight:400">[iPython](https://ipython.org/) / [Pandas](http://pandas.pydata.org/)</span>

<br/><img src="{{ "/images/ipy.png" | relative_url }}" style="box-shadow: 2px 2px 4pc #23352a;max-width:600px;"/><br/><br/>

Next I created an [iPython](https://ipython.org/) (aka Jupyter) notebook running Python 2.7 and imported [Pandas](http://pandas.pydata.org/), which is a data analysis library built on [Numpy](http://www.numpy.org/). Pandas works primarily with a datatype called a dataframe, which takes its name from the same type in [R](https://www.r-project.org/about.html).

After reading each CSV file into my Jupyter notebook as a Pandas dataframe, I was able to perform powerful SQL-like (or rather, super SQL) tasks on the data, including a chained `.merge()`, `.groupby()`, `.apply(list)` function that lets you merge a join table onto dataframe and save an array of ids from the join to each row.

For example, given a dataframe of authors and a join table of `author_ids` and `play_ids`, the function (shown below) will merge a list of `play_ids` on to each corresponding author record. This is exactly the task I needed to perform for most datatypes—add multiple plays to each author, add multiple performances to each play, and multiple scenes to each performance, and so on.

Once each dataframe was transformed to mirror the JSON schema I'd planned, I wrote them individually to new files using Pandas' `.to_json()` function. [You can see the complete notebook [here](https://github.com/mnyrop/bunraku-ipy/blob/master/bunraku-online.ipynb).]

#### Out: <span style="font-weight:400">[JSON](https://github.com/mnyrop/bunraku-ipy/tree/master/out/json)</span>

<br/>

## scene iii. Minify + convert to YAML

#### In: <span style="font-weight:400">[JSON](https://github.com/mnyrop/bunraku-ipy/tree/master/out/json)</span><br/>Tools: <span style="font-weight:400">[JQ](https://stedolan.github.io/jq/) / [PyYaml](http://pyyaml.org/)</span>

<br/><img src="{{ "/images/bash.png" | relative_url }}" style="box-shadow: 2px 2px 4pc #23352a;max-width:600px;"/><br/><br/>

#### Out: <span style="font-weight:400">[YAML](https://github.com/mnyrop/bunraku-ipy/tree/master/post-processing/yaml)</span>

<br/>
### <span style="font-weight:400">Next \>> </span>[part 3: the site](the-summer-of-puppets-3)
<br/><br/>
