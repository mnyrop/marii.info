---
layout: default
title: cv
permalink: /cv/
published: true
---
{% assign my = site.data.cv %}
# {{ my.name }}

## Profile
{{ my.profile }}

{{ my.contact }}

## Education
{% for e in my.education %}
- {{ e }}
{% endfor %}

## Experience
{% for e in my.experience %}
- {{ e }}
{% endfor %}

## Teaching
{% for t in my.teaching %}
- {{ t }}
{% endfor %}

## Presentations
{% for p in my.presentations %}
- {{ p }}
{% endfor %}

## Projects
{% for p in my.projects %}
- {{ p }}
{% endfor %}

## Service
{% for c in my.community_participation %}
- {{ c }}
{% endfor %}

## Skills
{% for s in my.skills %}
- {{ s }}
{% endfor %}

## Awards
{% for a in my.awards %}
- {{ a }}
{% endfor %}
