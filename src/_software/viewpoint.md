---
layout: project
order: 2
tagline: Create, Style, & Embed IIIF Views from URI Params 
title:  "Viewpoint"
img: '/images/viewpoint.jpg'
show_img: true
links: 
  - label: Live Demo
    url: "https://dss.hosting.nyu.edu/viewpoint/"
  - label: GitHub Repo
    url: "https://github.com/nyu-dss/viewpoint"
---

[Viewpoint](https://dss.hosting.nyu.edu/viewpoint) is a small [svelte application](https://svelte.dev/) that allows users to add one or more IIIF manifests from URL endpoints to a IIIF viewer and make style selections (e.g., show thumbnails left or bottom, hide thumbnails, use dark mode, etc.) in a graphical interface. 

The app is entirely static and it does not request or store data server-side. It consumes and passes off state information via URI query parameters and allows users to to embed the results where they need them, e.g., a course site, multimedia essay, or digital catalog.

The GitHub repo is a boilerplate; clicking the "Use this template" button will allow you to host your own on GitHub pages or another simple server.

Future versions will support multiple IIIF viewers; currently only flavors of Mirador are supported.
