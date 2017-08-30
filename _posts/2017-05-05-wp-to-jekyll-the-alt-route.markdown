---
layout: post
title:  "Moving from Wordpress to Jekyll:<br> Tips for the Alternate Route"
categories: main
date: 2017-05-05
sticky: true
---

Before I start explaining myself and my hacky process, I should say that there *is* a [Wordpress plugin for exporting to Jekyll](https://wordpress.org/plugins/jekyll-exporter/). It might work amazingly well, automatically doing everything I needed it to and more. I say 'might' because I genuinely don't know; I didn't get a chance to try it, which I'll blame on the outdated PHP (5.3) that the WP server was running. (The plugin requires >= 5.5).

So, if you're like me and can't get the plugin to work (for whatever your reason might be), you're going to need a Plan B. Depending on the relative size and complexity of your Wordpress site, I can all but guarantee it will be messy and a bit painful getting your WP data over into a new Jekyll site. But while I don't have a turnkey solution to offer you (this is the alternate route, after all!), I can at least offer the guidance and a few warnings that I wish I'd had ahead of time myself.

## The roadmap:

__1-2__ — A Wordpress plugin spits out a `.csv`<br>
__3__ — You transform it into a clean/usable `.csv` using OpenRefine<br>
__4__ — An in-browser or command line tool of choice converts it to `.yaml`<br>
__5-6__ — A Jekyll plugin generates new `.markdown` pages from the `.yaml`

## Roadmap explained, with gotchas:

#### 1. Install and activate this [CSV/XML Export plugin](https://wordpress.org/plugins/wp-all-export/) on your WP site.

The free version gets you everything you need __except__ for user export. (This wasn't particularly important for me, so I kept it cheap and simple.)

#### 2. Export the what you need, how you need it as CSV(s).

In my case, I've been working with Columbia's Developing Librarian Project site *[Breaking the Code ](https://developinglibrarian.library.columbia.edu/)*, which is a very straightforward Wordpress blog. As such, I only really cared about grabbing data about the __pages__ (with the title, content, and image filenames) and __posts__ (with title, slug, author, date, categories, tags, content, and image filenames). The UI for the CSV export plugin is incredibly intuitive and drag-and-drop, so you can pick which files and values matter most to you. Feel encouraged to uninstall the plugin when you're done, to avoid unnecessary WP bloat.

#### 3. Open your CSV(s) in OpenRefine.

Here's where an ounces of prevention is really worth a pound of cure. Since we know that our data is going to be converted to YAML, and will be used by liquid templates to generate HTML pages, there are several things we can do in OpenRefine to pre-process the data and give Jekyll a better shot at parsing it (all of which I learned the hard way).

__I. First off, we need to rename our headers.__ There are two key rules for renaming:

  + Since the data will be re-presented as `key: value` pairs, the header 'keys' cannot have spaces and should be lowercase. Change anything like `Image Filename` to `images`.

  + There are several variable names that are reserved or special in Jekyll, like `id`, `date`, `content`, `permalink`, `tags`, and `author`. Some of these you'll want to be the same in your data (so they can be used by Jekyll in the usual way), and others you'll want to keep separate to use on your own. I highly recommend renaming `content` and `id` to something else, e.g. `wp-content` and `wp-id`, but keeping `permalink`, `tags`, `author`, and `date` consistent.



__II. Speaking of date...__ if you are going to use the default key name, Jekyll is going to want a very specific kind of date format for its posts, namely: `YYYY-MM-DD HH:MM:SS +/-TTTT`. The time is optional so let's stick with `YYYY-MM-DD`. This is slightly different from the format the CSV export gives you(`YYYMMDD`, with no hyphens), so we'll need to change it in OpenRefine.

  + Click in the top of the date column, and select `Edit cells > Transform...`

  + Make sure that Language is set to "General Refine Expression Language (GREL)", then in the Expression box, type: `value.toDate('YYYYMMDD').toString('YYYY-MM-DD')`.<sup><a href="https://github.com/OpenRefine/OpenRefine/wiki/GREL-Date-Functions" target="\_blank">[1]</a></sup>

__III. Authors are people with names.__ And yet, they get exported from WP into the CSV as integers. Ouch. Unfortunately I haven't been able to figure out a way around this. In my case, there were only 15 authors to figure out, so I just made a text file with 1-15 listed, one on each line, and matched each with its corresponding name clicking a post by author 1, author 2, and so on. In OpenRefine, there's not a way (as far as I'm aware), to bulk replace integers with strings without getting into trouble. For example, if author `1` is `Alice`, you can't just `value.replace('1', 'Alice')`, because author `11` will become `AliceAlice`. Luckily, you can click on one cell in the `Author` column with the value `1`, edit it manually to `Alice`, and click "Apply to all similar cells". It's a bit tedious, but it works.

__IV. Any colons in your cells will get you into trouble__, because once converted to YAML, your parser will think you are trying to set up another `key: value pair`. If you know, for instance, that some of your titles have colons, wrap them preemptively in quotation marks using `Edit cells > Transform...` and the GREL expression `'"' + value + '"'`.

__V. Turn a multi-value cell into a YAML array in advance__ with a simple GREL expression. By default, the CSV exporter separates multiple values within the same cell using the char `|`. If, for example, you know that some of your posts have several tags, you can make your YAML parser happier by separating them instead by commas, and sticking them in brackets to designate an array. To do so, transform the cells using `Edit cells > Transform...` and the expression `[ "+value.replace("|", ", ")+" ]`. You can use the exact same expression on categories, images, or other columns that have cells with multiple values.

__VI. Relativize your permalinks__ by removing the protocol, domain, and any trailing directories, leaving only the unique slug. If, for example, your posts all follow the URL pattern `https://example.edu/blog/the-post-slug`, you can use the expression `value.replace("https://example.edu/blog/", "/")` to return just `/the-post-slug`.

__VII. Export!__ (sticking with comma separated values.)

<br>
<hr>
___Note: These steps do not guarantee that you'll have valid YAML after you export and convert your CSV, but they'll help you avoid a lot of the pitfalls that I fell into on and off for a day.___
<hr>
<br>

#### 4. Convert to YAML and lint it.

Depending on the size and privacy concerns of your data, you can avoid installing anything and special CLI tools and use [CSV to YAML](http://www.convertcsv.com/csv-to-yaml.htm) and [YAML Lint](http://www.yamllint.com/) in your browser. When you get the green "Valid YAML!" light, go ahead and save your file (e.g. `posts.yaml`) into the `_data` folder in the root of your Jekyll site.

#### 5. Generate posts/pages from your YAML file using [YAML-Splitter](https://github.com/mnyrop/yaml-splitter).
If you have multiple YAML files (e.g. `posts.yaml` and `pages.yml`, like I did), set each one up as a separate Jekyll collection in your `config.yml` file, then add the file `yml_splitter.rb` to the `_plugins` directory in the root of your site, and run `jekyll build`. Detailed instructions for setting up your collection(s) in `config` and using the plugin are in the [README.md](https://github.com/mnyrop/yaml-splitter).

#### 6. Augment your Jekyll layouts.

Depending on the data you exported, you'll want to render it on each page/post in different ways. If you included the content from your WP pages and posts in your CSV and renamed the field to something like `wp-content` back in OpenRefine, you'll want to change `page.html` and/or `post.html` in your `_layouts` folder to reflect that by replacing `{{ "{{ content " }}}}` with `{{ "{{ page.wp-content " }}}}`.

<br><br><br><br><br><br>
