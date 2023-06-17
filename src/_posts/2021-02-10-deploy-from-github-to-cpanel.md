---
layout: post
title: Action! Automate FTP deploys from GitHub to CPanel
time_period: 2021
tags: actions;ci;cpanel;github;
---
![deploy gif](https://thumbs.gfycat.com/AlarmingVeneratedArgentinehornedfrog-small.gif)

This process leverages GitHub Actions to build, test, and deploy a compiled Jekyll site to a CPanel account on a shared Reclaim hosting server. With slight modification, it should work for any fully-static or statically-generated site and any ol' server with FTP. Depending on how you build your site, the server shouldn't need Apache or Nginx since we'll syncing static files directly to `/public_html`.

### Step 1. **Create a GitHub repository with your site files**  
Feel free to use and remix [this template](https://github.com/nyu-dss/wh-deploilerplate).

### Step 2. **Create an FTP deploy account on your CPanel account**  
Log in to your dashboard and navigate to the "FTP Accounts" tab under "Files."
[![ftp dashboard]({% link images/cpanel_ftp.png %})]({% link images/cpanel_ftp.png %}){: .no-magic }

Create a special FTP account just for deployments. Under "directory" put `public_html`. If you want the site to be in a subdirectory from the root URL (e.g., "marii.hosting.nyu.edu/my-site"), enter the subdirectory after `public_html` with no trailing slash (e.g., `public_html/my-site`).
[![create ftp account]({% link images/create_ftp_account.png %})]({% link images/cpanel_ftp.png %}){: .no-magic }

More info available [here](https://docs.cpanel.net/cpanel/files/ftp-accounts/).

### Step 3. **Add your FTP deploy account credentials to your GitHub repo secrets settings**  
Since our GitHub repo will initiate FTP deployments for us, we need to give it our new credentials. To do so, navigate to your repo > Settings > Secrets. As the page says, "Secrets are environment variables that are encrypted" and made available to Actions workflows. The deployment workflow we'll define in the next step needs three environment vars: `FTP_SERVER`, `FTP_USERNAME`, and `FTP_PASSWORD`.  These need to be spelled verbatim unless you plan on customizing the action files.

Click "New repository secret" and create the variables one by one using the credentials you made in the last step. Note that `FTP_USERNAME` should have the "Log In" name you created, e.g, "my-deployer-name". The `FTP_SERVER` should be the "Host" you entered with no additional file paths or protocols.

[![secrets dashboard]({% link images/secrets_dash.png %})]({% link images/secrets_dash.png %}){: .no-magic }

More info available [here](https://docs.github.com/en/actions/reference/encrypted-secrets).

### Step 4. **Configure GitHub Actions workflow for your repo**

To set up a GitHub actions workflow, you'll define a set of steps and settings in YAML format and put them in your repo in a special directory `.github/workflows`. If you're using the [template](https://github.com/nyu-dss/wh-deploilerplate), this is already set up.

``` yml
# build, test, and ftp deploy a jekyll site
name: ci:deploy
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      BASEURL: ''
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 1
      - uses: ruby/setup-ruby@v1
        with:
          bundler-cache: true
      - name: install
        run: gem install bundler && bundle
      - name: build
        run: bundle exec rake build
      - name: test
        run: bundle exec rake test
      - name: deploy
        uses: SamKirkland/FTP-Deploy-Action@4.0.0
        with:
          server: {% raw %}${{secrets.FTP_SERVER}}{% endraw %}
          username: {% raw %}${{secrets.FTP_USERNAME}}@{{secrets.FTP_SERVER}}{% endraw %}
          password: {% raw %}${{secrets.FTP_PASSWORD}}{% endraw %}
          local-dir: ./_site/

```

More info available [here](https://docs.github.com/en/actions).
