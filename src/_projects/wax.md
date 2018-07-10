---
layout: post
title:  "Minicomp/Wax: Minimal IIIF Exhibitions with Jekyll"
era: current
order: 1
hero: 'https://minicomp.github.io/wiki/assets/wax_screen.gif'
overlay: red
tags:
  - minimal-computing
  - static-search
  - relational-data
  - digital-collections
  - 2017
---

## __Minicomp/Wax__ is a heterogeneous collection of experiments, strategies, and functional components for adapting [Jekyll](http://jekyllrb.com) for minimal exhibition sites.<br><br>It centers on a Jekyll theme ([wax](https://github.com/minicomp/wax/)) and set of Rake tasks ([wax_tasks](https://github.com/minicomp/wax_tasks/)) that together enable digital humanists to create impactful sites with [IIIF](http://iiif.io/) viewers, elastic search, and complex metadata with very little technical overhead.<br><br>It is a sister project to [Minicomp/Ed](https://github.com/minicomp/ed): Jekyll for Minimal Scholarly Editions.
<br>


## project context:

As a set of practices and priorities, **minimal computing** has proven well suited to the needs of digital humanities projects and scholars. Specifically, its tenets of [Minimal Dependencies](http://go-dh.github.io/mincomp/thoughts/2016/10/03/tldr#minimal-dependencies), [Minimal Maintenance](http://go-dh.github.io/mincomp/thoughts/2016/10/03/tldr#minimal-maintenance) and [Minimal Presence](http://go-dh.github.io/mincomp/thoughts/2016/10/03/tldr#minimal-presence) help offset DH's frequent scarcity of resources, and its emphases on [Maximum Access](http://go-dh.github.io/mincomp/thoughts/2016/10/03/tldr#maximum-access), [Minimal Consumption](http://go-dh.github.io/mincomp/thoughts/2016/10/03/tldr#minimal-use) and [Minimal Obsolescence](http://go-dh.github.io/mincomp/thoughts/2016/10/03/tldr#minimal-obsolescence) complement and strengthen the core of critical digital humanities work.

In line with the goals of minimal computing, **Minicomp/Wax** is a set of experiments, strategies, and functional components for adapting [Jekyll](http://jekyllrb.com) (a modular, minimal static site generator) to evolve alongside emergent digital humanities scholarship.

Though the objectives of Wax are ongoing, its success will be tied to the development of key workflows for producing **digital exhibitions**. These exhibitions, though minimal, will still include many of the components expected of database-powered platforms like WordPress, Scalar, and Omeka. The components themselves will be **discrete**, **lightweight**, **interoperable**, and **easy to use**, creating an expansive framework of Jekyll tooling that enables scholars to dynamically assemble what they need and drop what they don't.

Need a site with dynamic search but can't commit to maintaining a database? Need a simple blog but are worried about vulnerabilities in WordPress? Want to make a custom [IIIF](http://iiif.io/) image exhibition or a [D3js](https://d3js.org/) data visualization from student-generated CSVs? Need to host thousands of static pages, but don't have a budget for server space? These are just a few of the directions currently giving shape to Wax.

### output:

__[wax](https://github.com/minicomp/wax/)__ is a (soon-to-be) gem-packaged Jekyll theme.

__[wax_tasks](https://github.com/minicomp/wax_tasks/)__ is gem-packaged set of Rake tasks.


## running checklist:

**Note:** I count **experiments** as singular proofs-of-concept (usually as demos), **methods** as the generalization of experiments for others to apply (usually as tutorials/blog posts), and **components** as code for others to use with minimal change or configuration (usually in GitHub repositories).

<br>

**Experiment:** Client-side custom search index with [Lunrjs](https://lunrjs.com).<br> **Experiment:** [IIIF](http://iiif.io/) digital exhibition from local image tiles with [Mirador viewer](http://projectmirador.org).<br> **Experiment:** [IIIF](http://iiif.io/) digital exhibition from remote image server with [Openseadragon](https://openseadragon.github.io/).<br> **Experiment:** [D3js](https://d3js.org/) visualization of a Jekyll collection auto-generated via Liquid template. <br> **Experiment:** Convert an entire WordPress blog theme to work with Jekyll.<br> **Experiment:** Create a large (>40k page) relational Jekyll site. <br> **Experiment:** Host Jekyll sites with [GitHub pages](https://pages.github.com/).<br>


 **Method:** Create YAML data to power Jekyll site from MySQL database.<br> **Method:** Convert an existing WordPress site to Jekyll. <br> **Method:** Generate interactive [D3js](https://d3js.org/) visualizations from Jekyll data. <br> **Method:** Automate build tests with [Travis-CI](http://travis-ci.org). <br> **Method:** Automate html tests with [html-proofer](https://github.com/gjtorikian/html-proofer). <br> **Method:** Automate headless feature tests with [Rspec](http://rspec.info/), [Capybara](http://teamcapybara.github.io/capybara/), and [Poltergesit](https://github.com/teampoltergeist/poltergeist). <br> **Method:** Automate Jekyll deployment to S3 with Githooks.


 **Component:** Jekyll-plugin for auto-generating markdown pages from CSV files. <br> **Component:** Rake task for generating pages from JSON or CSV files. <br> **Component:** Rake task for generating IIIF tiles and JSON from local images. <br> **Component:** Rake task for generating ElasticLunr search index. <br> **Component:** Rake task for performing tests (htmlproofer + rspec) on compiled site.


## links + references:

__[xpmethod](http://xpmethod.plaintext.in):__ knowledge design studio @ columbia university's group for experimental methods in the humanities <br>
__[go::dh](http://go-dh.github.io/mincomp/thoughts/):__ minimal computing thought pieces from global outreach dh<br>
__[markdown](https://daringfireball.net/projects/markdown/):__  text-to-html conversion tool for web writers<br>
__[iiif](http://iiif.io/):__ consortium for the international image interoperability framework<br>
