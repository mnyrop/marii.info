---
layout: default
title: Projects
permalink: /projects/
published: true
---

{% assign projects = site.projects | sort: 'order' %}
{% for post in projects %}
  {% include blog.html %}
{% endfor %}
