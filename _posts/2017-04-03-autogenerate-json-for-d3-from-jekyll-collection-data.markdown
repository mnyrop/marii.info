---
layout: post
title:  "Auto-generate D3.js JSON from a Jekyll collection"
date: 2017-04-03
sticky: true
category: dev
tags:
  - jekyll
  - d3js
  - json
  - liquid
---

<iframe width="100%" height="600" src="//jsfiddle.net/marii_/uwzpnv5r/27/embedded/result,js/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


# The goal:

Produce a d3.js [force-directed graph](https://bl.ocks.org/mbostock/4062045) that visualizes a collection in your [Jekyll site](https://jekyllrb.com/) via tag clusters.

# How to do it:
__1.  Set up your Jekyll collection.__<br>
You can find tips for how to do that [here](https://jekyllrb.com/docs/collections/#step1).
<br><br>

__2.  Add your tag(s) to each collection page's YAML front matter.__<br>For example:
```
layout: default
title: 土地　正神
tags:
- Earth
- God of Wealth
---
```
<br>
__3.  Write some [Liquid](https://help.shopify.com/themes/liquid/basics) that will translate your collection data/pages into the JSON file that drives the D3 visualization.__<br>
This is the only tricky part of the process and, as such, will constitute pretty much the entirety of this post. To underscore this further:<br><br>
*The following is a guide for writing Liquid “code."<br> For your Jekyll site.<br> That generates a JSON file.<br> That drives a D3 force graph.<br> That visualizes a Jekyll collection.<br> Based on shared tags.*<br><br>
Whew. This sounds like a lot, but it's really not so bad. I promise that the hurdles are 90% cognitive (rather than technical), and only require that you understand the data you have versus the data you need.


__4.   Lastly, write or borrow some d3 + js force graph code.__<br>
You're welcome to use [mine](https://jsfiddle.net/marii_/uwzpnv5r/27/) as a starting place.

# The JSON:

Different visualizations generally want different data in different formats and/or structures. Luckily, most force-directed graphs (with the exception of [hierarchical graphs!](https://bl.ocks.org/mbostock/1093130)) want two JSON arrays: one with nodes, one with links. A rule of thumb: at minimum, each node needs an identifier key (e.g an `id`, `title`, or `name`), and each link needs a `source` node and a `target` node. You can add additional key/value pairs for more complex visualizations, but the following is a good standard:
<br><br>
```json
{
    "nodes": [
      {"id": "NODE_NAME"},
      {"id": "NODE_NAME"},
      {"id": "NODE_NAME"}
    ],
    "links": [
      {"source": "SOURCE_NODE_ID", "target": "TARGET_NODE_ID"},
      {"source": "SOURCE_NODE_ID", "target": "TARGET_NODE_ID"},
      {"source": "SOURCE_NODE_ID", "target": "TARGET_NODE_ID"}
    ]
}
```
<br><br>
In our example, nodes should include individual collection items as well as tags. Links are created to join items to their tags (and subsequently to other items with that tag).
<br><br>

*__Note!__* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The following is for writing liquid to generate both the list of nodes __and__ the list of links. However, many templates for force graphs can generate the list of nodes for you, from your list of links. So feel free to cheat/simplify what's below, to only generate the link array!
<br><br>
# The Liquid

Below you'll find step-by-step instructions for writing Liquid > JSON that can drive a D3 force graph. It assumes that you understand Jekyll and the basics of its templating engine Liquid. If you just want to copy the Liquid code in its entirety, you can grab the raw file [here](https://gist.github.com/mnyrop/17c54380e347f37beaa64cf8d2a64785)—just make sure its saved as a `.json` file in the root of your site, and Jekyll will compile it as valid JSON in your `_site` folder for you. But if you know the basics of Liquid and want to better understand the process in order to power your own visualizations, keep reading.

__1. Create a variable `{% raw  %}{{ tags }}{% endraw %}` by looping through each collection item and joining its tag(s) into one long string, each separated by a `^` character. Then make a unique [pseudo-array / substring list](https://shopify.github.io/liquid/basics/types/#initializing-arrays) from `{% raw  %}{{ tags }}{% endraw %}` called `{% raw  %}{{ tag_nodes }}{% endraw %}`.__

{% highlight liquid %}{% raw  %}

{% capture tags %}
  {% for item in site.paper_gods %}
    {% assign last = forloop.last %}
    {% for tag in item.tag %}
      {{ tag | strip_html | strip_newlines }}{% unless last %}^{% endunless %}
    {% endfor %}
  {% endfor %}
{% endcapture %}

{% assign tag_nodes = tags | split: '^' | uniq %}

{% endraw %}{% endhighlight %}

__2. Now make a variable `{% raw  %}{{ links }}{% endraw %}`. Then loop through each collection item and, for each tag associated with that item, make A JSON object with the item as the `source` and the tag as the `target` and capture it as the temporary variable `{% raw  %}{{ linkstring }}{% endraw %}`. Append that captured `{% raw  %}{{ linkstring }}{% endraw %}` to `{% raw  %}{{ links }}{% endraw %}`, separated by a `^` character. Finally, make another unique pseudo-array / substring `{% raw  %}{{ link_array }}{% endraw %}` by splitting `{% raw  %}{{ links }}{% endraw %}` by the `^` character and cleaning any mistakenly captured tabs, trailing spaces, or newlines.__

{% highlight liquid %}{% raw  %}

{% assign links = "" %}

{% for item in site.paper_gods %}
  {% for tag in item.tag %}
    {% capture linkstring %}
      { "source": {{ item.title | strip_newlines | strip_html | strip | jsonify }}, "target": {{ tag | jsonify }} }^
    {% endcapture %}
    {% assign links = links | append: linkstring %}
  {% endfor %}
{% endfor %}

{% assign link_array = links | strip | strip_newlines | split: "^" %}

{% endraw %}{% endhighlight %}

__3. Make a variable `{% raw  %}{{ json }}{% endraw %}` by printing the appropriate json formatting, assigning nodes (including collection items as well as unique tags from `{% raw  %}{{ tag_nodes }}{% endraw %}`), and links from `{% raw  %}{{ link_array }}{% endraw %}`. Nodes can include site URLs if you want to use your force graph as a tool for navigating your Jekyll site, or groups if you want to differentiate nodes for future functional/style distinctions.__

{% highlight liquid %}{% raw  %}

{% capture json %}
{
  "nodes": [
    {% for item in site.paper_gods %}{ "id": {{ item.title | strip_newlines | jsonify }}, "url": {{ site.baseurl | append: item.url | jsonify }}, "group": 1 },
    {% endfor %}
    {% for tag in tag_nodes %}{ "id": {{ tag | strip | strip_newlines | jsonify }}, "group": 2 }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ],
  "links": [
    {% for link in link_array %}{{ link | strip | strip_newlines }}{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
}
{% endcapture %}

{% endraw %}
{% endhighlight %}

__4. Finally, print the resulting json with any leftover tabs, trailing spaces, and/or newlines removed. Your final file (rendered in your `_site` folder) will be the output of this one line, since the Liquid above only captures and assigns information—it doesn't print it out.__
{% highlight liquid %}{% raw  %}

{{ json | strip }}

{% endraw %}
{% endhighlight %}

For my example collection, the json output looks like this:

```json
{
  "nodes": [
    { "id": "土地　正神"},
    { "id": "利市　迊喜　仙官"},
    { "id": "王　二爺　之　神"},
    { "id": "南天門　東廚　司命"},
    { "id": "天地　三界　十方　萬靈　眞宰 [碑亭]"},
    { "id": "玄壇　趙　元帥"},
    { "id": "玄壇　趙　元帥"},
    { "id": "威顯　關聖　大帝"},
    { "id": "大　中華　民國　二十年　灶君　之　神位"},
    { "id": "東廚　司命"},
    { "id": "五路　之　神"},
    { "id": "家宅　六神"},
    { "id": "財公　財母"},
    { "id": "管山　之　神"},
    { "id": "水草　馬明王"},
    { "id": "增 福 財神"},
    { "id": "增 福 財神"},
    { "id": "培姑　娘娘"},
    { "id": "龍王　之　神"},
    { "id": "青龍　之　神"},
    { "id": "白馬　先逢"},
    { "id": "土公　土母"},
    { "id": "黄河　金龍　四大王"},
    { "id": "太上　老君"},
    { "id": "Earth"},
    { "id": "God of Wealth"},
    { "id": "Kitchen"},
    { "id": "Pantheons"},
    { "id": "Underworld"},
    { "id": "Central Figures"},
    { "id": "Buddhas and Bodhisattvas"},
    { "id": "Heaven"}
  ],
  "links": [
    {"source": "土地　正神", "target": "Earth"},
    {"source": "利市　迊喜　仙官", "target": "Earth"},
    {"source": "王　二爺　之　神", "target": "God of Wealth"},
    {"source": "南天門　東廚　司命", "target": "Kitchen"},
    {"source": "天地　三界　十方　萬靈　眞宰 [碑亭]", "target": "Pantheons"},
    {"source": "玄壇　趙　元帥", "target": "Underworld"},
    {"source": "玄壇　趙　元帥", "target": "Underworld"},
    {"source": "威顯　關聖　大帝", "target": "Central Figures"},
    {"source": "大　中華　民國　二十年　灶君　之　神位", "target": "Kitchen"},
    {"source": "東廚　司命", "target": "Kitchen"},
    {"source": "五路　之　神", "target": "Earth"},
    {"source": "家宅　六神", "target": "Earth"},
    {"source": "財公　財母", "target": "God of Wealth"},
    {"source": "管山　之　神", "target": "Earth"},
    {"source": "水草　馬明王", "target": "Earth"},
    {"source": "增 福 財神", "target": "God of Wealth"},
    {"source": "增 福 財神", "target": "God of Wealth"},
    {"source": "培姑　娘娘", "target": "Buddhas and Bodhisattvas"},
    {"source": "龍王　之　神", "target": "Earth"},
    {"source": "青龍　之　神", "target": "Earth"},
    {"source": "白馬　先逢", "target": "Earth"},
    {"source": "土公　土母", "target": "Earth"},
    {"source": "黄河　金龍　四大王", "target": "Earth"},
    {"source": "太上　老君", "target": "Heaven"}
  ]
}
```

<br><br>

# Last Thoughts:

This result might not look super impressive just yet—especially since our example output is barely larger than our liquid template! However, you can use the same or a similar process to generate JSON that is way larger, way more complicated, and way more visually impactful. And did I mention that it will update automatically as your site grows??!! Since liquid is parsed on `jekyll build` and `jekyll serve` just like markdown, you won't need to touch your JSON-generating file again (unless you want to change the structure of it, and prototype something new).


<br><br><br><br><br>
