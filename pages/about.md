---
layout: default
title: About
permalink: /about/
published: true
---

<img src="https://pbs.twimg.com/profile_images/978862817544728576/fGZOac3f_400x400.jpg" style="float:left;display:block;margin-right:2em;"/>
<br><br>

# marii

libraries ☞ minimal computing ☞ cybernetic history ☞ soviet sci-fi ☞ fiber art.

__current:__ digital humanities developer @ columbia<br>
__past:__ post-baccalaureate technologist @ five college digital humanities

<br><br>

## labs ¬

- __[HistoryLab](http://history-lab.org/):__ History as Data Science
- __[xpMethod](http://xpmethod.plaintext.in/):__ Columbia's Group for Experimental Methods in the Humanities
- __[irlHumanities](http://irlhumanities.org/):__ Immersive Reality Lab for the Humanities

## dh sites ¬

- __[OurBelovedKin](http://ourbelovedkin.com/awikhigan/index):__ Remapping a New History of King Philip's War
- __[SudanPhoto](http://sudanphoto.uofk.edu/):__ University of Khartoum Sudan Historical Photography Archive
- __[Bunraku](https://bunraku.cul.columbia.edu/):__ The Barbara Curtis Adachi Bunraku Collection
- __[StyleRevolution](https://stylerevolution.github.io/):__ Journal des Dames et des Modes

## talks / workshops ¬

- __[Wax:  Minimal IIIF  for Experiments, Exhibitions, and Pedagogy](https://slides.com/marii/wax-minimal-iiif-for-experiments-exhibitions-and-pedagogy/)__.<br>2018 IIIF Conference, Library of Congress.
- __[Publishing Sites with GitHub Pages](/notes/nycdh-2018)__.<br>NYCDH Week workshop.


## recent reads ¬

<p>
	{% for book in site.data.books_current %}
		<i class="far fa-circle"></i> <b><a href="{{ book.link }}" target="\_blank" class="line-link">{{ book.title }}</a></b> ({{ book.author }}),
	{% endfor %}
	{% assign booksort = site.data.books | reverse %}
	{% assign num = booksort | size %}
	{% for book in booksort %}
	  <i class="far fa-check-circle"></i> <b><a href="{{ book.link }}" target="\_blank" class="line-link">{{ book.title }}</a></b> ({{ book.author }}){% unless forloop.last %}, {% endunless %}
	{% endfor %}
</p>
