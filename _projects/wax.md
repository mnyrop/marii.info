---
layout: page
title:  "Jekyll-Wax: Modules + Methods for Jekyll in the Expanded Field"
era: current
tags:
  - minimal-computing
  - static-search
  - relational-data
  - digital-collections
  - digital-publishing
---
<img src="http://www.vvork.com/wp-content/uploads/2009/01/picture-8.png"/>

#### status:
early stages / ongoing

#### one-sentence summary:
__jekyll-wax__ comprises a heterogeneous collection of experiments, strategies, and functional components for adapting [Jekyll](http://jekyllrb.com) to evolve alongside the needs of digital humanities researchers and practitioners.

#### project description:

As a set of practices and priorities, **minimal computing** has been particularly suited to the needs of digital humanities projects and scholars. Specifically, its tenets of [Minimal Dependencies](http://go-dh.github.io/mincomp/thoughts/2016/10/03/tldr#minimal-dependencies), [Minimal Maintenance](http://go-dh.github.io/mincomp/thoughts/2016/10/03/tldr#minimal-maintenance) and [Minimal Presence](http://go-dh.github.io/mincomp/thoughts/2016/10/03/tldr#minimal-presence) help offset DH's frequent scarcity of resources, and its emphases on [Maximum Access](http://go-dh.github.io/mincomp/thoughts/2016/10/03/tldr#maximum-access), [Minimal Consumption](http://go-dh.github.io/mincomp/thoughts/2016/10/03/tldr#minimal-use) and [Minimal Obsolescence](http://go-dh.github.io/mincomp/thoughts/2016/10/03/tldr#minimal-obsolescence) complement and strengthen the core of critical digital humanities work.

In line with the goals of minimal computing, **jekyll-wax** is a set of experiments, strategies, and functional components for adapting [Jekyll](http://jekyllrb.com) (a sustainable, modular static site generator) to suit the wide-ranging needs of emergent digital humanities scholarship.

Though primarily used to power blog-style sites, the mechanisms of Jekyll are open and adaptable. Its easy integration with **version control** and **markdown authoring**, as well as the readability of its templating engine [Liquid](https://help.shopify.com/themes/liquid) make it an excellent tool when working with students and newcomers to web development. Its output as static HTML pages makes Jekyll-powered sites easier and cheaper to secure, maintain, and update.

Though the objectives of jekyll-wax are ongoing, its success will be tied to the development of several key work flows, namely for producing **digital exhibitions**, **publications and journals**, and **(classroom) blogs** complete with many of the components expected of a database-powered platform like WordPress, Scalar, or Omeka. These components should be **discrete**, **lightweight**, **interoperable**, and **easy to use**.

#### checklist:

**Note:** I count **experiments** as singular proofs-of-concept (usually as demos), **methods** as the generalization of experiments for others to apply (usually as tutorials/blog posts), and **components** as code for others to use with minimal change or configuration (usually in GitHub repositories).

<i class="fa fa-check-square-o" aria-hidden="true"></i>
**Experiment:** Client-side custom search index with [Lunrjs](https://lunrjs.com).
<a href="http://marii.info/historical-photos/" style="border-bottom:none;"><i class="fa fa-flask" aria-hidden="true"></i></a><br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Experiment:** [IIIF](http://iiif.io/) digital exhibition from local image tiles with [Mirador viewer](http://projectmirador.org).<br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Experiment:** [IIIF](http://iiif.io/) digital exhibition from remote image server with [Openseadragon](https://openseadragon.github.io/).
<a href="http://marii.info/historical-photos/" style="border-bottom:none;"><i class="fa fa-flask" aria-hidden="true"></i></a><br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Experiment:** [D3js](https://d3js.org/) visualization of a Jekyll collection auto-generated via Liquid template.
<a href="https://cul.github.io/bunraku-demo/visualize/connected-characters/" style="border-bottom:none;"><i class="fa fa-flask" aria-hidden="true"></i></a><br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Experiment:** Convert an entire WordPress blog theme to work with Jekyll.
<a href="https://cul.github.io/ldpd-devlib/" style="border-bottom:none;"><i class="fa fa-flask" aria-hidden="true"></i></a><br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Experiment:** Create a large (>40k page) relational Jekyll site.
<a href="https://cul.github.io/bunraku-demo/" style="border-bottom:none;"><i class="fa fa-flask" aria-hidden="true"></i></a><br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Experiment:** Host Jekyll sites with [GitHub pages](https://pages.github.com/).
<a href="https://cul.github.io/bunraku-demo/" style="border-bottom:none;"><i class="fa fa-flask" aria-hidden="true"></i></a><br>
<br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Method:** Create YAML data to power Jekyll site from MySQL database.
<a href="/notes/the-summer-of-puppets" style="border-bottom:none;"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></a><br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Method:** Convert an existing WordPress site to Jekyll.
<a href="/notes/wp-to-jekyll-the-alt-route" style="border-bottom:none;"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></a><br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Method:** Generate interactive [D3js](https://d3js.org/) visualizations from Jekyll data.
<a href="/notes/autogenerate-json-for-d3-from-jekyll-collection-data" style="border-bottom:none;"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></a><br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Method:** Automate build tests with [Travis-CI](http://travis-ci.org).
<a href="/notes/jekyll-ci" style="border-bottom:none;"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></a><br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Method:** Automate html tests with [html-proofer](https://github.com/gjtorikian/html-proofer).
<a href="/notes/jekyll-ci" style="border-bottom:none;"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></a><br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Method:** Automate headless feature tests with [Rspec](http://rspec.info/), [Capybara](http://teamcapybara.github.io/capybara/), and [Poltergesit](https://github.com/teampoltergeist/poltergeist).
<a href="/notes/headless-test-dynamic-search" style="border-bottom:none;"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></a><br>
<i class="fa fa-square-o" aria-hidden="true"></i> **Method:** Automate Jekyll deployment to S3 with Githooks.<br>
<br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Component:** Jekyll-plugin for auto-generating exhibition pages from YAML data files.
<a href="https://github.com/mnyrop/yaml-splitter" style="border-bottom:none;"><i class="fa fa-github-alt" aria-hidden="true"></i></a><br>
<i class="fa fa-square-o" aria-hidden="true"></i> **Component:** Jekyll-plugin for auto-generating IIIF manifests from YAML data and remote image server.<br>
<i class="fa fa-square-o" aria-hidden="true"></i> **Component:** Jekyll-plugin for auto-generating Lunr search indexes from `_config.yml` information.<br>

#### links + reference:

__[xpmethod](http://xpmethod.plaintext.in):__ knowledge design studio @ columbia university's group for experimental methods in the humanities <br>
__[go::dh](http://go-dh.github.io/mincomp/thoughts/):__ minimal computing thought pieces from global outreach dh<br>
__[markdown](https://daringfireball.net/projects/markdown/):__  text-to-html conversion tool for web writers<br>
__[iiif](http://iiif.io/):__ consortium for the international image interoperability framework<br>
