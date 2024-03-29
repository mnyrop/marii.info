---
layout: project
order: 1
tagline: Craft Batch Publishing with Serverless IIIF
title:  Aperitiiif
# img: 'https://media4.giphy.com/media/4OPta6flqKAUVAkM5R/200w.gif?cid=6c09b952i180c328eocqyrd94q5ed3prpj252ko6b5ji8cpj&rid=200w.gif&ct=v'
img: '/images/aperitiiif.jpg'
img_caption: |
  « Arcachon : à ta santé Gustave ! » by Eloi Fouché. Retrieved from [Bibliothèque municipale de Bordeaux](https://selene.bordeaux.fr/notice?id=h%3A%3ABordeauxS_B330636101_EST163album_29&queryId=2a84ea2c-b163-494d-a791-8d390005c9d5&posInSet=1) (Licence Creative Commons Marque du Domaine Public 1.0.).
show_img: true
links: 
  - label: Documentation
    url: https://middlicomp.github.io/aperitiiif
  - label: GitHub Org
    url: https://github.com/middlicomp
---

[Aperitiiif](https://middlicomp.github.io/aperitiiif) is a workflow and set of components for batch publishing [IIIF](https://iiif.io/)-compliant image collections. It addresses the needs of research and scholarly collections—needs often distinct from collections formally acquired and stewarded by research institutions.

Aperitiiif leverages a multi-tenant [serverless-iiif](https://github.com/samvera-labs/serverless-iiif) implementation on AWS. “Batches” (i.e., discrete research collections) are managed via GitHub repos. GitHub handles all of the scoped user auth, GitHub Actions workflows create the IIIF manifests and deploy the generated resources to AWS, and GitHub Pages hosts an automated catalog site to present items for reuse. This architecture enables flexible user contributions with lower overhead for financial cost and technical maintenance.
