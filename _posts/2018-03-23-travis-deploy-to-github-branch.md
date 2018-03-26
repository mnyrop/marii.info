---
layout: post
title:  "Push Compiled Sites to GitHub Branches from Travis"
date: 2018-02-06
category: dev
sticky: true
tags:
  - travis
  - github
  - deploy
  - rake
---
Lately, I've been all but living in [Travis-CI](). It runs my tasks, performs my tests, and now pushes my sites out for deployment. It's almost as though—gasp!—I've achieved continuous integration. That being said, it took a ton of trial and error. If this post can spare you some of rigmarole, my efforts will be affirmed.

You might be asking yourself, doesn't Travis have a deploy provider for GitHub Pages? This is a fair question, especially because the answer is [100% yes](). However, the built-in GH Pages deploy is pretty inflexible. For example, I couldn't get it to ignore my `.bundle` and `vendor` directories, which it deployed along with my site every time. I also couldn't get it to use a custom `baseurl`.

Why is this important? At least in my case, I have many sites with my GitHub account. This means that, other than my main blog that uses the `.github.io` root, my sites need to use a `baseurl` that matches the name of my repo. But I don't want to add the `baseurl` to my `_config.yml` file, because I need to have the master branch and a compiled branch for s3 deployment without a `baseurl`.

This is all to say, I need more flexibility and control. And I got it with the workflow below.

## Step 1 Authorize Travis with an Access Token
