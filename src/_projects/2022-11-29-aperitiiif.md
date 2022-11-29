---
layout: post
title:  Aperitiiif
category: software development
img: 'https://media4.giphy.com/media/4OPta6flqKAUVAkM5R/200w.gif?cid=6c09b952i180c328eocqyrd94q5ed3prpj252ko6b5ji8cpj&rid=200w.gif&ct=v'
time_period: 2022
---
## Project Website:
<https://nyu-dss.github.io/aperitiiif>

## Project Description:

Aperitiiif is a workflow and set of components for batch publishing [IIIF](https://iiif.io/)-compliant image collections. It addresses the needs of research and scholarly collections—needs often distinct from collections formally acquired and stewarded by research institutions.

Aperitiiif leverages a multi-tenant [serverless-iiif](https://github.com/samvera-labs/serverless-iiif) implementation on AWS. “Batches” (i.e., discrete research collections) are managed via GitHub repos. GitHub handles all of the scoped user auth, GitHub Actions workflows create the IIIF manifests and deploy the generated resources to AWS, and GitHub Pages hosts an automated catalog site to present items for reuse. This architecture enables flexible user contributions with lower overhead for financial cost and technical maintenance.