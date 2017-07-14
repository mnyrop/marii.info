---
layout: post
title: The Summer of Japanese Puppets, Part 4
date: 2017-07-11
---

<iframe height="450px" src="https://www.youtube.com/embed/ZaI8fN4176k" frameborder="0" allowfullscreen></iframe>

This post is part 3 of 4 in a series. Feel free to skip around to:<br/><br/>__[part 1: the task](the-summer-of-puppets)__,<br/>__[part 2: data transformation](the-summer-of-puppets-2)__, or <br/>__[part 3: the site](the-summer-of-puppets-3)__.

<hr/>

# epilogue

<br/><a href="https://mnyrop.github.io/bunraku-demo"><img src="{{ "/images/demo.png" | relative_url }}" style="box-shadow: 2px 2px 4pc #23352a;"/><a/><br/><br/>

## [The demo](https://mnyrop.github.io/bunraku-demo)!

The finished demo has directories of
[plays](https://mnyrop.github.io/bunraku-demo/plays),
[productions](https://mnyrop.github.io/bunraku-demo/productions),
[performances](https://mnyrop.github.io/bunraku-demo/performances),
[authors](https://mnyrop.github.io/bunraku-demo/authors),
[performers](https://mnyrop.github.io/bunraku-demo/performers),
[characters](https://mnyrop.github.io/bunraku-demo/characters),
[kashira](https://mnyrop.github.io/bunraku-demo/kashira),
[scenes](https://mnyrop.github.io/bunraku-demo/performances/scenes/2671),
[image tags](https://mnyrop.github.io/bunraku-demo/tags),
[slide images](https://mnyrop.github.io/bunraku-demo/slides),
[image albums](https://mnyrop.github.io/bunraku-demo/albums), and
[realia images](https://mnyrop.github.io/bunraku-demo/realia),
with individual layouts displaying and linking object data together.

It is navigable through the above directory listings, through several dynamic search boxes running client-side [Lunrjs](https://lunrjs.com/), and via clickable [D3js](https://d3js.org/) data visualizations.

It handles relative/massive image sets by implementing lazy load in a jQuery carousel.

<br/>
<iframe width="100%" height="700" src="//jsfiddle.net/marii_/zkdzy0qq/2/embedded/result,js/" allowfullscreen="allowfullscreen" frameborder="0" style="box-shadow: 2px 2px 4pc #23352a;"></iframe>
<br/><br/>

# tl;dr.


In: Cake PHP site powered by Relational MYSQL database<br/>1: MySQL dump to CSVs<br/>2: Import CSVs into [IPython](https://ipython.org/) as [Pandas](http://pandas.pydata.org/) dataframes<br/>3: Merge relational data (from CSV jointables) onto Dataframes by type<br/>4: Export Dataframes as JSON records (and CSVs, for archival purposes only).<br/>5: Drop null key:value pairs from JSON (bash [JQ](https://stedolan.github.io/jq/))<br/>6: Convert (no nulls) JSON to YAML (bash [Pyyaml](http://pyyaml.org/))<br/>7: Generate [Jekyll collections](https://jekyllrb.com/docs/collections/) (and pages) from YAML using [Yaml-Splitter plugin](https://github.com/mnyrop/yaml-splitter)<br/>Out: Static Jekyll site powered by YAML data, with JSON index for static search

# sequel/teaser

On the horizon:

- Implementing dual English/Japanese search
- Adding advanced/structured search
- Adding drop-down menu navigation
- Adding more data visualizations in various formats
- Refactoring layouts and assets

<br/><br/>
