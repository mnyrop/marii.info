---
layout: post
title: The Summer of Japanese Puppets<br/>(Part 1 of 4)
date: 2017-07-11
sticky: true
---

<br/>
<img src="http://www.columbia.edu/cgi-bin/dlo?obj=ldpd_bun_slide_362_1_6665_8069&size=medium" style="box-shadow: 2px 2px 4pc #23352a;"/>
<br/><br/>


This post is part 1 of 4 in a series. Feel free to skip around to:<br/><br/>__[part 2: data transformation]({{ site.url }}/the-summer-of-puppets-2)__,<br/>__[part 3: the site]({{ site.url }}/the-summer-of-puppets-3)__, or<br/>__[part 4: epilogue]({{ site.url }}/the-summer-of-puppets-4)__.

<hr/>

# Enter: Bunraku

A few months ago, I was given access to a MySQL database with 27 tables of data on _[Bunraku](https://en.wikipedia.org/wiki/Bunraku)_, or Japanese puppet theater. The data consists primarily of digitized images from the Barbara Curtis Adachi Bunraku Collection here at [Columbia University Libraries](http://library.columbia.edu), but it also contains a ton of relational data on the Bunraku community as Barbara encountered it—which is to say, as a rich network of performers, plays, productions, puppets, craftsmen, narrators, musicians, authors, theaters, instruments, old friends, and even older tales. To be more specific, the data models the complex interrelations of...

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

... spanning decades of Barbara's involvement with the leading Bunraku troupes in Japan. [Aside: [Want to learn more about Barbara?](http://www.sfgate.com/bayarea/article/Barbara-Curtis-Adachi-puppet-theater-expert-2822735.php)]

<br/><br/>
<img src="http://www.columbia.edu/cgi-bin/dlo?obj=ldpd_bun_slide_382_1_7021_8470&size=medium" style="box-shadow: 2px 2px 4pc #23352a;"/>
<br/><br/>

# Act 1: The Task

Both the MySQL database and the PHP site it powers have been slated for retirement this summer, so my task has been to create a modern, sustainable, and [static](https://en.wikipedia.org/wiki/Web_template_system#Static_page_generators) replacement. This replacement needs to handle each of the ten main data object types and their associations—connecting authors to the plays they'd written, connecting those plays to their respective performances (via productions), connecting performers to those performances, and so on in a semi-hierarchical and sprawling fashion. It also needs to approximate the advanced search capabilities of the current site, add new navigational entry points and paths, and accommodate the sometimes enormous number of images associated with a given play or other type of object.


Sounds a bit tedious but simple enough. Yet the project necessitated tackling several difficult (or at least new) questions, namely:

1. How can the data be modeled and converted into static, browser-friendly formats?

2. How should the site relate to that data? (i.e. should all the pages be pre-built from the data, or should the browser do the relational heavy-lifting?)

3. How will search be implemented without the use of a database (or any communication with the server)?

4. How will the site deal with pages that include upwards of 1500 images?

5. How can I create visualizations of the data, and recast them as functional navigational tools to the user?

6. Is it possible to make the site lightweight-enough to run smoothly on less-than-stellar connections? ...on mobile?

7. Can I implement advanced English/Japanese search? With both roman and kanji characters?

<br/>
### <span style="font-weight:400">Next \>> </span>[part 2: data transformation]({{ site.url }}/the-summer-of-puppets-2)
<br/><br/>
