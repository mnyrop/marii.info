---
layout: post
title:  "Create and store static IIIF annotations... Minicomp style"
date: 2018-01-31
category: dev
sticky: true
tags:
  - jekyll
  - iiif
  - rake
---
<iframe width="100%" height="400" src="https://www.youtube-nocookie.com/embed/nHbsm8T1BnI?rel=0&amp;controls=0&amp;showinfo=0?rel=0&autoplay=1&vq=hd720" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
<br>
<hr/>
### <span style="font-weight:400">__This post__ is about a recent Proof of Concept demo I made for adding and storing [IIIF](http://iiif.io/) compliant [annotation lists](http://iiif.io/api/presentation/2.1/#annotation-list) without configuring an endpoint or database. Feel free to skip ahead and play with the demo [here](http://marii.info/annotate/).</span>
<hr/>
<br>

### <span style="font-weight:400">__what it is:__ A workflow for creating and storing annotations on IIIF manifests that leverages the [Project Mirador](http://projectmirador.org/) viewer, [Jekyll](http://jekyllrb.com/), and [Rake](https://ruby.github.io/rake/).</span>

### <span style="font-weight:400">__mirador:__ serves as the UI for adding and displaying annotations.</span>

### <span style="font-weight:400">__jekyll:__ serves the site and helps to reconcile the lists.</span>

### <span style="font-weight:400">__rake tasks:__ formats the annotation json and creates a copy of the manifest to reference them.</span>

### <span style="font-weight:400">__some custom javascript:__ retrieves the annotations from your browsers's localStorage cache and allows you to view/download their source.</span>

<br>
<hr/>
<br>
