---
layout: post
title: The Summer of Japanese Puppets, Part 4
time_period: 2017
overlay: green
img: 'https://www1.columbia.edu/sec-cgi-bin/cul/dlo?obj=ldpd_bun_slide_024_1_0427_0621&size=medium'
tags: d3js;lunr;jekyll
---
<iframe height="450" width="800" src="https://www.youtube.com/embed/ZaI8fN4176k" frameborder="0" allowfullscreen></iframe>

This post is part 4 of 4 in a series. Feel free to skip around to:

[part 1: the task]({{ site.url }}/notes/the-summer-of-puppets),
[part 2: data transformation]({{ site.url }}/notes/the-summer-of-puppets-2), or
[part 3: the site]({{ site.url }}/notes/the-summer-of-puppets-3).

<br><br>

# epilogue

<br><a href="https://bunraku.cul.columbia.edu/"><img src="{{ "/images/demo.png" | relative_url }}" /></a><br><br>

## [The demo](https://bunraku.cul.columbia.edu/)!

The mostly finished demo has directories of
[plays](https://bunraku.cul.columbia.edu/plays/),
[productions](https://bunraku.cul.columbia.edu/productions/),
[performances](https://bunraku.cul.columbia.edu/performances/),
[authors](https://bunraku.cul.columbia.edu/authors/),
[performers](https://bunraku.cul.columbia.edu/performers/),
[characters](https://bunraku.cul.columbia.edu/characters/),
[kashira](https://bunraku.cul.columbia.edu/kashira/),
[scenes](https://bunraku.cul.columbia.edu/scenes/2671/), and
[image tags](https://bunraku.cul.columbia.edu/tags/)

with individual layouts displaying and linking object data together.

It is navigable through the above directory listings, through several dynamic search boxes running client-side [Lunrjs](https://lunrjs.com/), and via clickable [D3js](https://d3js.org/) data visualizations. It handles relative/massive image sets by implementing lazy load in a jQuery carousel.


<br>
<iframe width="800" height="500" src="https://jsfiddle.net/marii_/zkdzy0qq/2/embedded/result,js/" allowfullscreen="allowfullscreen" frameborder="0" ></iframe>
<br><br>

# tl;dr.

- Started with a Cake PHP site powered by a relational MYSQL database.
- MySQL dump to CSVs.
- Imported CSVs into [IPython](https://ipython.org/) as [Pandas](https://pandas.pydata.org/) dataframes.
- Merged relational data (from CSV jointables) onto dataframes by type.
- Exported dataframes as JSON records (and CSVs, for archival purposes only).
- Dropped null key:value pairs from JSON using [JQ](https://stedolan.github.io/jq/).
- Generated [Jekyll collections](https://jekyllrb.com/docs/collections/) (and pages) from YAML using [wax_tasks gem](https://github.com/mnyrop/wax_tasks).
- Ended with a ~40k page static Jekyll site powered by YAML data, with JSON index for client-side search.
