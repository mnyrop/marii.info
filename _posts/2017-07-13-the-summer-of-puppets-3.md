---
layout: post
title: The Summer of Japanese Puppets, Part 3
date: 2017-07-11
---

<img src="{{ "/images/gabu.jpg" | relative_url }}" style="box-shadow: 2px 2px 4pc #23352a;width:100%;height:500px;"/>

This post is part 3 of 4 in a series. Feel free to skip around to:<br/><br/>__[part 1: the task](the-summer-of-puppets)__,<br/>__[part 2: data transformation](the-summer-of-puppets-2)__, or <br/>__[part 4: epilogue](the-summer-of-puppets-4)__.

<hr/>

# Act 3: The site emerges

## iv. Ingest + generate


#### In: <span style="font-weight:400">[YAML](https://github.com/mnyrop/bunraku-ipy/tree/master/post-processing/yaml)</span><br/>Tools: <span style="font-weight:400">[Jekyll](https://jekyllrb.com/) / [YAML-Splitter](https://github.com/mnyrop/yaml-splitter)</span>

<br/><img src="{{ "/images/jekyll-config.png" | relative_url }}" style="box-shadow: 2px 2px 4pc #23352a;max-width:600px;"/><br/><br/>

#### Out: <span style="font-weight:400">[Jekyll Collections](https://github.com/mnyrop/bunraku-jekyll)</span>

<br/>



## v.  Template + build


#### In: <span style="font-weight:400">[Jekyll Collections](https://github.com/mnyrop/bunraku-jekyll)</span><br/>Tools: <span style="font-weight:400">[Liquid](https://shopify.github.io/liquid/)</span>

<br/><img src="{{ "/images/layout.png" | relative_url }}" style="box-shadow: 2px 2px 4pc #23352a;max-width:600px;"/><br/><br/>

#### Out: <span style="font-weight:400">[Jekyll Site](https://github.com/mnyrop/bunraku-demo)</span>

<br/>

## vi. Search/Display/Visualize

#### In: <span style="font-weight:400">[Jekyll Site](https://github.com/mnyrop/bunraku-demo)</span><br/>Tools: <span style="font-weight:400">[Lunrjs](https://lunrjs.com/) / [jQuery Slick Slider](http://kenwheeler.github.io/slick/) / [Matplotlib](https://matplotlib.org/) / [D3js](https://d3js.org/)</span>

<br/>
<iframe width="100%" height="700" src="//jsfiddle.net/marii_/zkdzy0qq/2/embedded/result,js/" allowfullscreen="allowfullscreen" frameborder="0" style="box-shadow: 2px 2px 4pc #23352a;"></iframe>
<br/><br/>
<br/><br/>


## _Offstage_: Paths I could have taken, but did not.

#### Lovefield: <span style="font-weight:400">[https://github.com/google/lovefield](https://github.com/google/lovefield/)</span><br/> GraphQL: <span style="font-weight:400">[http://graphql.org/](http://graphql.org/)</span>


<br/>
### <span style="font-weight:400">Next \>> </span>[part 4: epilogue](the-summer-of-puppets-4)
<br/><br/>
