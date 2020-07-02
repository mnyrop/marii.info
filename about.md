---
layout: default
---
<img src="{{ '/images/avatar.jpg' | relative_url }}" style="max-width:300px;"/>
<br><br>

__current:__ digital humanities technology specialist @ nyu it & libraries  
__past:__ digital humanities developer @ columbia university libraries; post-baccalaureate technologist @ five college digital humanities

## labs ¬

- __[HistoryLab](http://history-lab.org/):__ History as Data Science
- __[xpMethod](http://xpmethod.plaintext.in/):__ Columbia's Group for Experimental Methods in the Humanities
- __[irlHumanities](http://irlhumanities.org/):__ Immersive Reality Lab for the Humanities

## advisory / steering committee participation ¬
- __[Archipelago](http://archipelago.nyc/)__ @ __[Metropolitan NY Library Council](https://metro.org/)__
- __[CollectionBuilder](https://www.imls.gov/grants/awarded/lg-34-19-0064-19)__ @ __[University of Idaho Libraries](https://www.lib.uidaho.edu/digital/)__
- __[Strategic Directions: Digital Scholarship](https://strategicdirections.library.columbia.edu/inspire-inquiry)__ @ __[Columbia University Libraries](https://library.columbia.edu)__
- __[Digital Humanities](https://5colldh.org/)__ @ __[Five College Consortium](https://www.fivecolleges.edu/)__

## talks given / workshops + courses led ¬

- __[Minimal Computing: Nimble Projects for Shaping and Sharing Histories](http://web.sas.upenn.edu/dream-lab/2018/09/14/minimal-computing/)__. Digital Resources and Methods (DReAM) Lab @ University of Pennsylvania. June 2019.
- __[Research Computing with Python](https://columbiaswc.github.io/2019-01-17-Columbia-Section-3/)__. Foundations for Research Computing x Software Carpentries Bootcamp @ Columbia University. January 2019.
- __[Minimal Computing for Image Collections: The Case of Wax](https://slides.com/marii/dlf2018-wax/#/)__. October 2018. Digital Library Federation (DLF) Forum.
- __[Research Computing with Python](https://columbiaswc.github.io/2018-08-27-Columbia-B/)__. Foundations for Research Computing x Software Carpentries Bootcamp @ Columbia University. August 2018.
- __[Wax:  Minimal IIIF  for Experiments, Exhibitions, and Pedagogy](https://slides.com/marii/wax-minimal-iiif-for-experiments-exhibitions-and-pedagogy/)__. May 2018. IIIF Conference @ Library of Congress.
- __[Publishing Sites with GitHub Pages](/notes/nycdh-2018)__. February 2018. NYCDH Week @ Columbia University.
- __[P2P?: Democracy, Deregulation, and Discontents](/projects/p2p)__. January 2015. Undergraduate course at Hampshire College, sponsored by [5CollDH](http://5colldh.org).

## recent reads ¬

<p>
	{% for book in site.data.books_current %}
		<i class="far fa-circle"></i> <b><a href="{{ book.link }}" target="\_blank" class="line-link">{{ book.title }}</a></b> ({{ book.author }}),
	{% endfor %}
	{% assign booksort = site.data.books | reverse %}
	{% assign num = booksort | size %}
	{% for book in booksort %}
	  <i class="far fa-check-circle"></i> <b><a href="{{ book.link }}" target="\_blank" {% if book.wnbt %}style="color: blue;"{% endif %} class="line-link">{{ book.title }}</a></b> ({{ book.author }}){% unless forloop.last %}, {% endunless %}
	{% endfor %}
</p>
