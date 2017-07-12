---
layout: post
title: The Summer of Japanese Puppets
date: 2017-07-11
---


<img src="http://www.columbia.edu/cgi-bin/dlo?obj=ldpd_bun_slide_727_4_1571_1574&size=medium"/>
<br/><br/>
## Enter: Bunraku

A few months ago, I was given access to a MySQL database with 27 tables of data on Bunraku, or Japanese Puppet Theater. The data consisted primarily of digitized images from the Barbara Curtis Adachi Bunraku Collection housed here ay Columbia University, but it also contained an lot of relational data on the Bunraku community as Barbara encountered it, which is to say as a rich network of performers, plays, productions, puppets, craftsmen, narrators, musicians, authors, theaters, instruments, old friends, and even older stories. Or, to be more specific, the complex interrelations of...

- 123 __authors__,<br/>
- 2,107 __characters__,<br/>
- 21,268 __images__,<br/>
- 129 __kashira__ (puppets),<br/>
- 931 __performances__,<br/>
- 184 __performers__,<br/>
- 178 __plays__,<br/>
- 293 __productions__,<br/>
- 2,609 __scenes__, and <br/>
- 76 __image subject tags__

... spanning many decades of Barbara's involvement with the leading Bunraku troupes in Japan. [Aside: [Want to learn more about Barbara?](http://www.sfgate.com/bayarea/article/Barbara-Curtis-Adachi-puppet-theater-expert-2822735.php)]

## 0: The Task

Both the MySQL database and the PHP site it powers have been slated for retirement this summer, so my task has been to replace them with a modern, sustainable, functional, and static equivalent. Sounds simple enough, but the project necessitated tackling several difficult (or at least new) questions:

1. How can the data be modeled and converted into static, browser-friendly formats?

2. How should the site relate to that data? (i.e. should all the pages be pre-built from the data, or should the browser do the relational heavy-lifting?)

3. How will search be implemented without the use of a database (or any communication with the server)?

4. How will the site deal with pages that include upwards of 1500 images?

5. How can I create visualizations of the data, and recast them as functional navigational tools to the user?

6. Is it possible to make the site lightweight-enough to run smoothly on less-than-stellar connections? ...on mobile?

7. Can I implement advanced English/Japanese search? With both roman and kanji characters?



## 1. plan + tidy :

#### In: <span style="font-weight:400">MySQL dump</span><br/>Tools: <span style="font-weight:400">[OpenRefine](http://openrefine.org/) / [json-schema](http://json-schema.org/)</span>

I started by using [JSON Schema](http://json-schema.org/) to plan out what each data type (e.g. play, kashira, character, etc.) should look like at the end of the processing stage by asking/answerinq questions like: _Which keys does each type need? Which keys should be named in a standardized way across data types? What kind of value does a given key expect, and does it expect 1 or many?_

Once each type was reasonably mapped out, I exported the MySQL database as a set CSV files and turned to [OpenRefine](http://openrefine.org/) (formerly known as GoogleRefine) to clean them up. I used faceting to get a better sense of each data type, recast strings as ints and visa versa, scrubbed out line breaks, dropped unused columns, consolidated similar cells, and so on. Then I renamed as many columns as possible to cohere to the somewhat-standardized JSON schema I'd created, and finally re-exported them as spiffed-up CSVs.

#### Out: <span style="font-weight:400">[Optimized CSVs](https://github.com/mnyrop/bunraku-ipy/tree/master/in)</span>




## 2. Process + convert to JSON:

#### In: <span style="font-weight:400">[CSVs](https://github.com/mnyrop/bunraku-ipy/tree/master/in)</span><br/>Tools: <span style="font-weight:400">[iPython](https://ipython.org/) / [Pandas](http://pandas.pydata.org/)</span>

#### Out: <span style="font-weight:400">[JSON](https://github.com/mnyrop/bunraku-ipy/tree/master/out/json)</span>


## 3. Minify + convert to YAML:

#### In: <span style="font-weight:400">[JSON](https://github.com/mnyrop/bunraku-ipy/tree/master/out/json)</span><br/>Tools: <span style="font-weight:400">[JQ](https://stedolan.github.io/jq/) / [PyYaml](http://pyyaml.org/)</span>


#### Out: <span style="font-weight:400">[YAML](https://github.com/mnyrop/bunraku-ipy/tree/master/post-processing/yaml)</span>







## 4. Ingest + generate:



#### In: <span style="font-weight:400">[YAML](https://github.com/mnyrop/bunraku-ipy/tree/master/post-processing/yaml)</span><br/>Tools: <span style="font-weight:400">[Jekyll](https://jekyllrb.com/) / [YAML-Splitter](https://github.com/mnyrop/yaml-splitter)</span>

#### Out: <span style="font-weight:400">[Jekyll Collections](https://github.com/mnyrop/bunraku-jekyll)</span>




## 5.  Template + build:


#### In: <span style="font-weight:400">[Jekyll Collections](https://github.com/mnyrop/bunraku-jekyll)</span><br/>Tools: <span style="font-weight:400">[Liquid](https://shopify.github.io/liquid/)</span>

#### Out: <span style="font-weight:400">[Jekyll Site](https://github.com/mnyrop/bunraku-demo)</span>




## 6. Search/Display/Visualize:

#### In: <span style="font-weight:400">[Jekyll Site](https://github.com/mnyrop/bunraku-demo)</span><br/>Tools: <span style="font-weight:400">[Lunrjs](https://lunrjs.com/) / [jQuery Slick Slider](http://kenwheeler.github.io/slick/) / [D3js](https://d3js.org/)</span>

#### Out: <span style="font-weight:400"><span style="font-weight:400">[Better Jekyll Site](https://github.com/mnyrop/bunraku-demo)</span></span>


<br/><br/>


## Offstage: Paths I could have taken, but did not.

#### Lovefield: <span style="font-weight:400">[https://github.com/google/lovefield](https://github.com/google/lovefield/)</span><br/> GraphQL: <span style="font-weight:400">[http://graphql.org/](http://graphql.org/)</span>




<!--<center>
  <iframe width="400" height="300" src="https://www.youtube.com/embed/ZaI8fN4176k" frameborder="0" allowfullscreen></iframe>
</center>-->
