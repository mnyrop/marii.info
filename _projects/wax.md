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

Though the objectives of jekyll-wax are ongoing, its success will be tied to the development of several key work flows, namely for producing **digital exhibitions**, **publications and journals**, and **(classroom) blogs** complete with many of the components expected of a database-powered site like WordPress, Scalar, or Omeka. These components should be **discrete**, **lightweight**, **interoperable**, and **easy to use**.

#### checklist:

**Note:** I count **experiments** as singular proofs-of-concept (usually as demos), **methods** as the generalization of experiments for others to apply (usually as blog posts), and **components** as code for others to use with minimal change or configuration (usually in GitHub repositories).

<i class="fa fa-check-square-o" aria-hidden="true"></i> **Experiment:** Client-side custom search index with [Lunrjs](). ↠ <br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Experiment:** [IIIF]() digital exhibition from local image tiles with [Mirador viewer](). ↠ <br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Experiment:** [IIIF]() digital exhibition from remote image server with [Openseadragon](). ↠ <br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Experiment:** [D3js]() visualization of a Jekyll collection auto-generated via Liquid template. ↠ <br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Experiment:** Convert an entire WordPress blog theme to work with Jekyll. ↠ <br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Experiment:** Create a large (>40k page) relational Jekyll site. ↠ <br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Experiment:** Host Jekyll sites with GitHub pages. ↠ <br>
<br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Method:** Create YAML data to power Jekyll site from MySQL database. ↠ <br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Method:** Convert an existing WordPress site to Jekyll. ↠ <br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Method:** Generate interactive D3 visualizations from Jekyll data. ↠ <br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Method:** Automate build tests with [Travis-CI](). ↠ <br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Method:** Automate html tests with [html-proofer](). ↠ <br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Method:** Automate headless feature tests with [Rspec](), [Capybara](), and [Poltergesit](). ↠ <br>
<i class="fa fa-square-o" aria-hidden="true"></i> **Method:** Automate Jekyll deployment to S3 with Githooks. ↠ <br>
<br>
<i class="fa fa-check-square-o" aria-hidden="true"></i> **Component:** Jekyll-plugin for auto-generating exhibition pages from YAML data files. ↠ <br>
<i class="fa fa-square-o" aria-hidden="true"></i> **Component:** Jekyll-plugin for auto-generating IIIF manifests from YAML data and remote image server. ↠ <br>
<i class="fa fa-square-o" aria-hidden="true"></i> **Component:** Jekyll-plugin for auto-generating Lunr search indexes from `_config.yaml` information. ↠ <br>

<!-- #### links + reference: -->

<!-- __[Amet]():__ consectetur adipiscing elit.<br>
__[Amet]():__ consectetur adipiscing elit.<br>
__[Amet]():__ consectetur adipiscing elit.<br>
__[Amet]():__ consectetur adipiscing elit.<br>
__[Amet]():__ consectetur adipiscing elit.<br>
__[Amet]():__ consectetur adipiscing elit.<br>
__[Amet]():__ consectetur adipiscing elit.<br> -->
