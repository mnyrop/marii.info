---
layout: default
title: home
---

<hr>

## marii nyrop

<hr>
<br>

<p style="max-width:75ch">
    full stack open source developer and solutions engineer based in queens, ny. <br><br>
    i author software packages, design user interfaces, and build cloud architectures and workflows for librarians, archivists, humanities researchers, and other keepers of cultural heritage.
</p>

<p style="max-width:75ch">
    if you have a project to propose, please <a id="contact-clip" href="#">click here</a> to copy my email and drop a line!
</p>
<script src="/assets/clippy.js"></script>
{% if site.data.social %}
<p>
{% for item in site.data.social %}
    <a href="{{ item.url | absolute_url }}" target="_blank">{{ item.title }}</a>{% unless forloop.last %}&nbsp;{% endunless %}
{% endfor %}
</p>
{% endif %}

<br>
<hr>

<span id="projects"></span>
{% include projects_list.html %}

<span id="notes"></span>
{% include posts_list.html %}

<br><br>
<br><br>