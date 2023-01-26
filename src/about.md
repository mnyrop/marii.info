---
layout: default
title: cv
---

<hr>

## marii nyrop – cv

<hr>
<br>

<p style="max-width:75ch;">
    <b>current:</b> senior research data engineer @ nyu it & libraries
</p>
<p style="max-width:75ch;">
    <b>past:</b> digital humanities technology specialist @ nyu it & libraries; digital humanities developer @ columbia university libraries; post-baccalaureate technologist @ five college digital humanities
</p>
{% if site.data.social %}
<p>
{% for item in site.data.social %}
    <a href="{{ item.url | absolute_url }}" target="_blank">{{ item.title }}</a>{% unless forloop.last %}&nbsp;{% endunless %}
{% endfor %}
</p>
{% endif %}

<br>
<hr>

{% include labs_list.html %}
{% include committees_list.html %}
{% include teaching_and_talks_list.html %}

<br><br>
<br><br>