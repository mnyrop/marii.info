---
layout: post
title: The Summer of Japanese Puppets
date: 2017-07-11
---


<img src="http://www.columbia.edu/cgi-bin/dlo?obj=ldpd_bun_slide_727_4_1571_1574&size=medium"/>
<br/><br/>
## Enter: Bunraku

A few months ago, I was given access to a MySQL database with 27 tables of data on Bunraku, or Japanese Puppet Theater. The data consisted primarily of digitized images from the Barbara Curtis Adachi Bunraku Collection housed here ay Columbia University, but it also contained an awful lot of relational data on the Bunraku community as Barbara encountered it: as a rich network of performers, plays, productions, puppets, craftsmen, narrators, musicians, authors, theaters, instruments, old friends, and even older stories. Or, to be more specific, the complex interrelations of...

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

... spanning many decades of Barbara's involvement with several of the leading Bunraku troupes in Japan. [[Want to learn more about Barbara?](http://www.sfgate.com/bayarea/article/Barbara-Curtis-Adachi-puppet-theater-expert-2822735.php)]

## 1: The Task

Both the MySQL database and the PHP site it powers have been slated for retirement this summer, so my task has been to replace them with a modern, sustainable, functional, and static equivalent. Sounds simple enough, but the project necessitated tackling several difficult (or at least new) questions:

1. How can the data be modeled and converted into a static, browser-friendly form?

2. How should the site relate to that data? (Should all the pages be pre-built from the data, or should the browser to the relational heavy-lifting?)

3. How will search be implemented without a the use of a database or any communication with the server?

4. How will the site deal with pages that include upwards of 1500 images?

5. How can I create visualizations of the data, and recast them as functional navigational tools to the user?

6. Is it possible to make the site lightweight-enough to run smoothly on less than stellar connections? On mobile?

7. What about advanced English/Japanese search? With both roman and kanji characters?


## Offstage: Paths I could have taken, but did not.

#### Lovefield: <span style="font-weight:400">[https://github.com/google/lovefield](https://github.com/google/lovefield/)</span><br/> GraphQL: <span style="font-weight:400">[http://graphql.org/](http://graphql.org/)</span>


## 2. Suiting up montage (or, what I actually used):

#### OpenRefine: <span style="font-weight:400">[http://openrefine.org/](http://openrefine.org/)</span><br/>JSON Schema: <span style="font-weight:400">[http://json-schema.org/](http://json-schema.org/)</span><br/>IPython (Jupyter): <span style="font-weight:400">[https://ipython.org/](https://ipython.org/)</span><br/>Pandas: <span style="font-weight:400">[http://pandas.pydata.org/](http://pandas.pydata.org/)</span><br/>JQ: <span style="font-weight:400">[https://stedolan.github.io/jq/](https://stedolan.github.io/jq/)</span><br/>PyYaml: <span style="font-weight:400">[http://pyyaml.org/](http://pyyaml.org/)</span><br/>Jekyll: <span style="font-weight:400">[https://jekyllrb.com/](https://jekyllrb.com/)</span><br/>YAML-Splitter: <span style="font-weight:400">[https://github.com/mnyrop/yaml-splitter](https://github.com/mnyrop/yaml-splitter)</span><br/>Liquid: <span style="font-weight:400">[https://shopify.github.io/liquid/](https://shopify.github.io/liquid/)</span><br/>Lunrjs: <span style="font-weight:400">[https://lunrjs.com/](https://lunrjs.com/)</span><br/>jQuery Slick Slider: <span style="font-weight:400">[http://kenwheeler.github.io/slick/](http://kenwheeler.github.io/slick/)</span><br/>D3js: <span style="font-weight:400">[https://d3js.org/](https://d3js.org/)</span><br/>


## 3. OpenRefine and json-schema


[..... _TBC_]

<!--<center>
  <iframe width="400" height="300" src="https://www.youtube.com/embed/ZaI8fN4176k" frameborder="0" allowfullscreen></iframe>
</center>-->
