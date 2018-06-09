---
layout: post
title: The Summer of Japanese Puppets, Part 4
date: 2017-07-11
overlay: green
hero: 'https://www1.columbia.edu/sec-cgi-bin/cul/dlo?obj=ldpd_bun_slide_024_1_0427_0621&size=medium'
tags:
  - d3js
  - lunr
  - jekyll
---

<iframe style="height:450px; width:100%" src="https://www.youtube.com/embed/ZaI8fN4176k" frameborder="0" allowfullscreen></iframe>

This post is part 4 of 4 in a series. Feel free to skip around to:

[part 1: the task]({{ site.url }}/notes/the-summer-of-puppets),
[part 2: data transformation]({{ site.url }}/notes/the-summer-of-puppets-2), or
[part 3: the site]({{ site.url }}/notes/the-summer-of-puppets-3).

<br><br>

# epilogue

<br><a href="https://bunraku.cul.columbia.edu/"><img src="{{ "/images/demo.png" | relative_url }}" style="box-shadow: 2px 2px 4pc #23352a;"/></a><br><br>

## [The demo](https://bunraku.cul.columbia.edu/)!

The mostly finished demo has directories of
[plays](https://bunraku.cul.columbia.edu/plays/),
[productions](https://bunraku.cul.columbia.edu/productions/),
[performances](https://bunraku.cul.columbia.edu/performances/),
[authors](https://bunraku.cul.columbia.edu/authors/),
[performers](https://bunraku.cul.columbia.edu/performers/),
[characters](https://bunraku.cul.columbia.edu/characters/),
[kashira](https://bunraku.cul.columbia.edu/kashira/),
[scenes](https://bunraku.cul.columbia.edu/scenes/2671/),
[image tags](https://bunraku.cul.columbia.edu/tags/),
[slide images](https://bunraku.cul.columbia.edu/slides/), and
[image albums](https://bunraku.cul.columbia.edu/albums/)
with individual layouts displaying and linking object data together.

It is navigable through the above directory listings, through several dynamic search boxes running client-side [Lunrjs](https://lunrjs.com/), and via clickable [D3js](https://d3js.org/) data visualizations. It handles relative/massive image sets by implementing lazy load in a jQuery carousel.

To learn more about implementing D3 visualizations in Jekyll, you can check out [this post]({{ site.url }}/notes/autogenerate-json-for-d3-from-jekyll-collection-data). And a post on building multi-language Lunr indexes in Jekyll should be coming soon!

<br>
<iframe width="100%" height="700" src="//jsfiddle.net/marii_/zkdzy0qq/2/embedded/result,js/" allowfullscreen="allowfullscreen" frameborder="0" style="box-shadow: 2px 2px 4pc #23352a;"></iframe>
<br><br>

# tl;dr.

<i class="fa fa-chevron-circle-right" aria-hidden="true"></i>&nbsp;&nbsp;
Started with a Cake PHP site powered by a relational MYSQL database.

<i class="fa fa-chevron-circle-right" aria-hidden="true"></i>&nbsp;&nbsp;
MySQL dump to CSVs.

<i class="fa fa-chevron-circle-right" aria-hidden="true"></i>&nbsp;&nbsp;
Imported CSVs into [IPython](https://ipython.org/) as [Pandas](http://pandas.pydata.org/) dataframes.

<i class="fa fa-chevron-circle-right" aria-hidden="true"></i>&nbsp;&nbsp;
Merged relational data (from CSV jointables) onto dataframes by type.

<i class="fa fa-chevron-circle-right" aria-hidden="true"></i>&nbsp;&nbsp;
Exported dataframes as JSON records (and CSVs, for archival purposes only).

<i class="fa fa-chevron-circle-right" aria-hidden="true"></i>&nbsp;&nbsp;
Dropped null key:value pairs from JSON using [JQ](https://stedolan.github.io/jq/).


<i class="fa fa-chevron-circle-right" aria-hidden="true"></i>&nbsp;&nbsp;
Generated [Jekyll collections](https://jekyllrb.com/docs/collections/) (and pages) from YAML using [wax_tasks gem](https://github.com/mnyrop/wax_tasks).

<i class="fa fa-chevron-circle-right" aria-hidden="true"></i>&nbsp;&nbsp;
Ended with a ~40k page static Jekyll site powered by YAML data, with JSON index for client-side search.



<br><br>
