---
layout: post
title: The Summer of Japanese Puppets, Part 4
date: 2017-07-11
---

<iframe height="450px" src="https://www.youtube.com/embed/ZaI8fN4176k" frameborder="0" allowfullscreen></iframe>

This post is part 3 of 4 in a series. Feel free to skip around to:<br/><br/>__[part 1: the task]({{ site.url }}/the-summer-of-puppets)__,<br/>__[part 2: data transformation]({{ site.url }}/the-summer-of-puppets-2)__, or <br/>__[part 3: the site]({{ site.url }}/the-summer-of-puppets-3)__.

<hr/>

# epilogue

<br/><a href="https://mnyrop.github.io/bunraku-demo"><img src="{{ "/images/demo.png" | relative_url }}" style="box-shadow: 2px 2px 4pc #23352a;"/><a/><br/><br/>

## [The demo](https://mnyrop.github.io/bunraku-demo)!

The mostly finished demo has directories of
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

It is navigable through the above directory listings, through several dynamic search boxes running client-side [Lunrjs](https://lunrjs.com/), and via clickable [D3js](https://d3js.org/) data visualizations. It handles relative/massive image sets by implementing lazy load in a jQuery carousel.

To learn more about implementing D3 visualizations in Jekyll, you can check out [this post](autogenerate-json-for-d3-from-jekyll-collection-data). And a post on building multi-language Lunr indexes in Jekyll should be coming soon!

<br/>
<iframe width="100%" height="700" src="//jsfiddle.net/marii_/zkdzy0qq/2/embedded/result,js/" allowfullscreen="allowfullscreen" frameborder="0" style="box-shadow: 2px 2px 4pc #23352a;"></iframe>
<br/><br/>

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
Converted (non-nulls) JSON to YAML using [Pyyaml](http://pyyaml.org/).

<i class="fa fa-chevron-circle-right" aria-hidden="true"></i>&nbsp;&nbsp;
Generated [Jekyll collections](https://jekyllrb.com/docs/collections/) (and pages) from YAML using [Yaml-Splitter plugin](https://github.com/mnyrop/yaml-splitter).

<i class="fa fa-chevron-circle-right" aria-hidden="true"></i>&nbsp;&nbsp;
Ended with a ~40k page static Jekyll site powered by YAML data, with JSON index for client-side search.

<br/>

# On the horizon

<i class="fa fa-minus-square-o" aria-hidden="true"></i>&nbsp;&nbsp;
Implementing dual English/Japanese search

<i class="fa fa-minus-square-o" aria-hidden="true"></i>&nbsp;&nbsp;
Adding advanced/structured search

<i class="fa fa-minus-square-o" aria-hidden="true"></i>&nbsp;&nbsp;
Adding drop-down menu navigation

<i class="fa fa-minus-square-o" aria-hidden="true"></i>&nbsp;&nbsp;
Adding more data visualizations in various formats

<i class="fa fa-minus-square-o" aria-hidden="true"></i>&nbsp;&nbsp;
Refactoring layouts and asset scripts

<i class="fa fa-minus-square-o" aria-hidden="true"></i>&nbsp;&nbsp;
Adding IIIF manifests in Mirador for realia images

<br/>

# last thoughts/notes

<i class="fa fa-hand-o-right" aria-hidden="true"></i>&nbsp;&nbsp;
Jekyll is shockingly powerful, but WOW is it slow when building a site at this scale.


<i class="fa fa-hand-o-right" aria-hidden="true"></i>&nbsp;&nbsp;
Having your data set at-the-ready in clean JSON is great for the long term, and leaves plenty of room for others to play with/visualize it.

<i class="fa fa-hand-o-right" aria-hidden="true"></i>&nbsp;&nbsp;
Processing data in iPy with Pandas is super easy, and the notebooks can double as documentation for what you've done.

<i class="fa fa-hand-o-right" aria-hidden="true"></i>&nbsp;&nbsp;
Apparently you can just throw ~40k pages at GitHub pages without a hitch...?


<br/><br/>
