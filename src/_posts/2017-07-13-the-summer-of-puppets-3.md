---
layout: post
title: The Summer of Japanese Puppets, Part 3
time_period: 2017
overlay: purple
img: 'https://www1.columbia.edu/sec-cgi-bin/cul/dlo?obj=ldpd_bun_slide_677_4_0606_0607&size=medium'
tags: jekyll;github-pages;liquid
---

This post is part 3 of 4 in a series. Feel free to skip around to:

[part 1: the task]({{ site.url }}/notes/the-summer-of-puppets),
[part 2: data transformation]({{ site.url }}/notes/the-summer-of-puppets-2), or
[part 4: epilogue]({{ site.url }}/notes/the-summer-of-puppets-4).


**Act 3: The site emerges**

**iv. Ingest + generate**

__In:__ [JSON](https://github.com/mnyrop/bunraku-ipy/tree/master/post-processing/json)

__Tools:__ [Jekyll](https://jekyllrb.com/) / [wax_tasks gem](https://github.com/mnyrop/wax_tasks)

Once I had my data packaged and ready in individual JSON array files (e.g. `authors.json`), I needed to create a Jekyll collection for each type, and 'split' the array of objects into individual markdown pages (e.g. `/_authors/1.md`) with YAML as the pages' [front matter](https://jekyllrb.com/docs/frontmatter/):

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

To generate metadata'd pages like the one above, I added the [wax_tasks gem](https://rubygems.org/gems/wax_tasks) to my Gemfile, installed it with `$ bundle install`, then configured my collections to work with it in `_config.yml`:

```yaml
collections:
  authors:
    source: authors.json
    directory: authors
    layout: author_page
  characters:
    source: characters
    directory: characters
    layout: character_page
  ...
```


> Note: You can find more thorough documentation on how to configure your collections to work with `wax_tasks`
[here](https://github.com/mnyrop/wax_tasks/blob/master/README.md).*


__Out:__ Jekyll Collections

<br>


**v.  Template + build**


__In:__ Jekyll Collections

__Tools:__ [Liquid](https://shopify.github.io/liquid/)

`wax_tasks` also gives you the option to designate a layout for each collection, and will add that metadata to each markdown page it creates. I gave each type its own layout, for example `author-page.html`, shown below:

<br><img src="{{ "/images/layout.png" | relative_url }}"/><br><br>

If you're familiar with Jekyll's templating language [Liquid](https://shopify.github.io/liquid/), this should look very familiar. `{% raw %}{{ page.label_eng }}{% endraw %}` compiles as the string specified as `label_eng` in the page's front matter, the same goes for `{% raw %}{{ page.label_ka }}{% endraw %}`, and so on. What's interesting, though, is line #13:

```html
{% raw %}{% assign play = site.data.plays | where: "id", p | first %}{% endraw %}
```

__This is where everything starts to come together.__ Because the author markdown pages only have an array of `play_ids` in their front matter (e.g. `play_id: [19, 72, 105, 122]`), if I want the compiled author pages to display the actual _titles_ of those plays, I need Liquid to fetch this information from the `plays.json` file for me. Thus, the author layout needs to:

1. Iterate through each `play_id` in the page's front-matter
2. For each `play_id`, find the play in plays.yaml that matches the `play_id`, and store it temporarily in the variable `play`
3. Grab the labels associated with the `play` and build a link for them using the `play`'s `id`.

You _must_ include the pipe `| first` at the end of your tag because Liquid `| where:` pipes will always return an array (regardless of the fact that _we_ know `id` is a primary key, and will only match one play.)


__Out:__ Compiled Jekyll Pages

<br><img src="{{ "/images/author.png" | relative_url }}"/><br><br>

After writing templates for each object type as well as templates for viewing the [lists of each type](https://bunraku.cul.columbia.edu/authors/), the main components of the site were finally in place.
