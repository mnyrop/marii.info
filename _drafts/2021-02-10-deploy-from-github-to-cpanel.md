---
layout: post
title: Actions!!! Automate FTP deploys from GitHub to CPanel
time_period: 2021
img: 'https://i.makeagif.com/media/5-21-2015/W4vUS3.gif'
tags: actions;ci;cpanel;github;
---

**The process leverages GitHub actions to build, test, and deploy a compiled Jekyll site to a CPanel account on a shared Reclaim hosting server.** With slight modification, it should work for any fully-static or statically-generated site and any ol' server with FTP. Depending on how you build your site, the server shouldn't need Apache or Nginx since we'll syncing static files directly to `/public_html`.

## Steps
1. **Create a github a repo with your site files**  
Feel free to use and remix [this template](https://github.com/nyu-dss/wh-deploilerplate).
2. **Create an ftp deploy account on your cpanel account**  
More info available [here](https://docs.cpanel.net/cpanel/files/ftp-accounts/).
3. **Add your ftp deploy account info to your github repo secrets settings**  
More info available [here](https://docs.github.com/en/actions/reference/encrypted-secrets)
4. **Configure github action workflow for your repo**
More info available [here](https://docs.github.com/en/actions)

![deploy gif](https://thumbs.gfycat.com/AlarmingVeneratedArgentinehornedfrog-small.gif)
