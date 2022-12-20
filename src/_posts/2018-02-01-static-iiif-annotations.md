---
layout: post
title:  "Create and store static IIIF annotations Minicomp style"
time_period: 2018
overlay: green
img: 'https://darthcrimson.org/wp-content/uploads/2016/10/parser3-1024x568.png'
tags: jekyll;iiif;rake
---

__This post__ is about a recent Proof of Concept demo I made for adding and storing [IIIF](https://iiif.io/) compliant [annotation lists](https://iiif.io/api/presentation/2.1/#annotation-list) without configuring an endpoint or database. Feel free to skip ahead and play with the demo [here](https://marii.info/annotate/).

__what it is:__ A workflow for creating and storing annotations on IIIF manifests that leverages the [Project Mirador](https://projectmirador.org/) viewer, [Jekyll](https://jekyllrb.com/), and [Rake](https://ruby.github.io/rake/).

__mirador:__ serves as the UI for adding and displaying annotations.

__jekyll:__ serves the site and helps to reconcile the lists.

__rake tasks:__ formats the annotation json and creates a copy of the manifest to reference them.

__some custom javascript:__ retrieves the annotations from your browsers's localStorage cache and allows you to view/download their source.

<br><br>

<iframe width="100%" height="400" src="https://www.youtube-nocookie.com/embed/nHbsm8T1BnI?rel=0&amp;controls=0&amp;showinfo=0?rel=0&autoplay=1&vq=hd720" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
