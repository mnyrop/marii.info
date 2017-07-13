---
layout: post
title: The Summer of Japanese Puppets, Part 3
date: 2017-07-11
---

<img src="{{ "/images/gabu.jpg" | relative_url }}" style="box-shadow: 2px 2px 4pc #23352a;width:100%;height:500px;"/>

This post is part 3 of 4 in a series. Feel free to skip around to:<br/><br/>__[part 1: the task](the-summer-of-puppets)__,<br/>__[part 2: data transformation](the-summer-of-puppets-2)__, or <br/>__[part 4: epilogue](the-summer-of-puppets-4)__.

<hr/>

# Act 3: The site emerges

## iv. Ingest + generate

#### In: <span style="font-weight:400">[YAML](https://github.com/mnyrop/bunraku-ipy/tree/master/post-processing/yaml)</span><br/>Tools: <span style="font-weight:400">[Jekyll](https://jekyllrb.com/) / [YAML-Splitter](https://github.com/mnyrop/yaml-splitter)</span>

Once I had my data packaged and ready in individual YAML array files (e.g. authors.yaml), I needed to create a Jekyll collection for each type, and 'split' the array of objects into individual markdown pages (e.g. `/_authors/1.md`) with the YAML as the pages' [front matter](https://jekyllrb.com/docs/frontmatter/). For example:

__/_authors/1.md__ :
```yaml
---
dates: fl. 1741-1767
id: '1'
label_eng: Asada Icchō
label_ka: 浅田一鳥
play_id:
- '19'
- '72'
- '105'
- '122'
reference: LC Authorities
layout: author_page
---
```

To do this, I cloned the [YAML-Splitter](https://github.com/mnyrop/yaml-splitter) Jekyll plugin I'd made a few months ago into a directory called `_plugins` in the root of my Jekyll site, then configured my collections in `_config.yml`:

<br/><img src="{{ "/images/jekyll-config.png" | relative_url }}" style="box-shadow: 2px 2px 4pc #23352a;max-width:600px;"/><br/><br/>

[__Note:__ You can learn how to configure your collections to work with YAML-Splitter
__[here](https://github.com/mnyrop/yaml-splitter/blob/master/README.md)__.]

If `yml_split` and `output` are set to `true`, YAML-Splitter will generate the pages in separate directories for each type (e.g. `_authors`, `_kashira`, etc.) within the site's root folder.


#### Out: <span style="font-weight:400">[Jekyll Collections](https://github.com/mnyrop/bunraku-jekyll)</span>

<br/>


## v.  Template + build


#### In: <span style="font-weight:400">[Jekyll Collections](https://github.com/mnyrop/bunraku-jekyll)</span><br/>Tools: <span style="font-weight:400">[Liquid](https://shopify.github.io/liquid/)</span>

YAML-Splitter also gives you the option to designate a layout for each collection, and will add that metadata to each markdown page it creates. I gave each type its own layout, for example `author-page.html`, shown below:

<br/><img src="{{ "/images/layout.png" | relative_url }}" style="box-shadow: 2px 2px 4pc #23352a;"/><br/><br/>

If you're familiar with Jekyll's templating language [Liquid](https://shopify.github.io/liquid/), this should look very familiar. `{% raw %}{{ page.label_eng }}{% endraw %}` compiles as the string specified as `label_eng` in the page's front matter, the same goes for `{% raw %}{{ page.label_ka }}{% endraw %}`, and so on. What's interesting, though, is line #13:

```html
{% raw %}{% assign play = site.data.plays | where: "id", p | first %}{% endraw %}
```

__This is where everything starts to come together.__ Because the author markdown pages only have an array of `play_ids` in their front matter, if I want the compiled author pages to display the actual _titles_ of the plays written, I need Liquid to fetch this information from the `plays.yaml` file for me. Thus, the author layout

1. Loops through each `play_id` in the page's front-matter
2. For each `play_id`, finds the play in plays.yaml that matches the `play_id`, and stores it temporarily in the variable `play`
3. Grabs the labels associated with the `play`, and builds a link for them using the `play`'s `id`.

You _must_ include the pipe `| first` at the end because Liquid `| where:` pipes will always return an array (regardless of the fact that _we_ know `id` is a primary key, and only 1 play will match.)


#### Out: <span style="font-weight:400">[Compiled Jekyll Site](https://github.com/mnyrop/bunraku-demo)</span>

<br/><img src="{{ "/images/author.png" | relative_url }}" style="box-shadow: 2px 2px 4pc #23352a;"/><br/><br/>

<br/>

<br/>
### <span style="font-weight:400">Next \>> </span>[part 4: epilogue](the-summer-of-puppets-4)
<br/><br/>
