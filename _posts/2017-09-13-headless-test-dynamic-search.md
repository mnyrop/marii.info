---
layout: post
title:  "Continuous Integration II: Headless Tests w/ RSpec, Capybara, and Poltergeist"
time_period: 2017
overlay: red
img: 'https://i.gifer.com/8Qfd.gif'
tags:
  - ci;rspec;capybara;poltergeist
---

# What is a headless feature test?

The term "headless" refers to software capable of working without a GUI. Accordingly, **headless feature tests** are programmatic actions that **simulate in-brower user interactions with site features** (without needing to actually open a GUI browser!) **and then return results on the success (or failure)** of that interaction.

**In simpler terms:** they're programs that go test your features for you, and come back bearing some good or not-so-good news.

Headless feature tests (like any [unit tests](http://searchsoftwarequality.techtarget.com/definition/unit-testing)) are an important part of any **[Continuous Integration](https://aws.amazon.com/devops/continuous-integration/) (CI)** architecture. If you're new to CI and want to figure out how to set up your Jekyll site in a continuously integrated way, check out [this other post]({{ site.baseurl }}/notes/jekyll-ci) first. If you're all set up with CI for Jekyll and want to take it to the next step, this post is for you.



# What tools do we need?

## [Travis-CI](https://travis-ci.org)
"... is a hosted, distributed continuous integration service used to build and test software projects hosted at GitHub," that basically tests your build and performs any other tasks you specify on a VM in the cloud. For more on Jekyll and Travis, refer back to [this post]({{ site.baseurl }}/notes/jekyll-ci).

## [Rspec](http://rspec.info/)
... is a Ruby gem and "spec runner" for *behavior-driven development*, which is exactly what it sounds like. Rspec lets you write tests for what your code *should* do, which in turn helps you write better, less fickle code.

## [Rack-Jekyll](https://github.com/adaoraul/rack-jekyll)
... is a Ruby gem and Jekyll plugin that transforms your Jekyll site into a [Rack](https://rack.github.io/) application. If you're not familiar with Rack, all you need to know is that it is the preferred app format for Capybara, so Jekyll-Rack is just translating our Jekyll site to an app that Capybara will get along with better.

## [Capybara](http://teamcapybara.github.io/capybara/)
... is a Ruby gem that "helps you test web applications by simulating how a real user would interact with your app." It's basically what makes Rspec act like a user.

## [Poltergeist](https://github.com/teampoltergeist/poltergeist)
... is a Ruby gem and driver for Capybara that allows you to run your tests on a headless WebKit browser provided by PhantomJS. It's basically what gives Capybara access to your browser in order to go around pretending like a user.

__To summarize (very roughly):__ You write Rspec tests. Rack-Jekyll will translate your Jekyll site to a Rack app. Capybara, pretending to be a user, will access a headless (non-GUI) browser with the help of Poltergeist, open your Rack-like Jekyll site and, finally, perform your RSpec tests on it. This is a crude depiction, since many of these roles overlap. But you get the picture.

# Example: testing your site search

I have Lunr search enabled on several of my Jekyll sites and, since Lunr indexing is a little wild and prone to errors, I've make a headless test for my search feature.

This headless test needs to:

__1. visit pages that have a unique search index,<br>2. confirm that the pages have search bars,<br>3. confirm that terms theoretically present in the index actually yield results when searched,<br>4. confirm that the results link to existing internal pages, and<br>5. confirm that the terms expected are indeed present on those pages.__

The following will show you step-by-step how to configure and write such a test.


## part 1 – rspec configuration

<div class="highlighter-rouge">
  <pre class="highlight"><code>
  <span class="s" style="color:black">. </span><span style="color:#666"># site root</span>
  <span class="s" style="color:black">├── _includes</span>
  <span class="s" style="color:black">├── _layouts</span>
  <span class="s" style="color:black">├── _posts</span>
  <span class="s" style="color:black">├── _site</span>
  <span class="s" style="color:black">├── <span style="color:#019129">spec</span></span>
  <span class="s" style="color:black">│   ├── <span style="color:#019129">spec_helper.rb</span></span>
  <span class="s" style="color:black">│   └── <span style="color:#019129">lunr_spec.rb</span></span>
  <span class="s" style="color:black">└── <span style="color:#927f01">_config.yml</span></span>
  <span class="s" style="color:black">└── <span style="color:#019129">.rspec</span></span>
  <span class="s" style="color:black">└── <span style="color:#927f01">.travis.yml</span></span>
  <span class="s" style="color:black">└── <span style="color:#927f01">Gemfile</span></span>
  <span class="s" style="color:black">└── index.md</span>
  </code></pre>
</div><span style="display:none">__</span>

Add a `spec` directory to the root of your site, and create `spec_helper.rb` and `lunr_spec.rb` inside it. You'll leave these empty for now and come back to them later.

### .rspec:

Next add an `.rspec` file to the root of your site and give it the following information:

```
--require spec_helper
--color
--format documentation
```

### Gemfile:

Add `rspec`, `capybara`, `poltergeist`, and `rack-jekyll` to the dev/test group of your `Gemfile`:

<div>
  <pre><code>
  <span class="s">source "https://rubygems.org"</span>
  <span class="s">gem "jekyll", "3.5.2"</span>

  <span class="s" >group :development, :test do</span>
    <span class="s">gem 'html-proofer'</span>
    <span class="s" style="color:#019129">gem "rspec"</span>
    <span class="s" style="color:#019129">gem 'capybara'</span>
    <span class="s" style="color:#019129">gem 'poltergeist'</span>
    <span class="s" style="color:#019129">gem "rack-jekyll"</span>
  <span class="s">end</span>
  </code></pre>
</div>

### .travis.yml:

Add `bundle exec rspec` test to the `script` group of your `.travis.yml` file:

<div>
  <pre><code>
  <span class="s">language: ruby</span>
  <span class="s">rvm:</span>
    <span class="s">- 2.4</span>
  <span class="s">script:</span>
    <span class="s">- bundle exec jekyll build</span>
    <span class="s">- bundle exec htmlproofer ./_site --only-4xx --check-html --assume-extension</span>
      <span class="s">- NOKOGIRI_USE_SYSTEM_LIBRARIES=true</span>
    <span class="s" style="color:#019129">- bundle exec rspec</span>
  </code></pre>
</div><span style="display:none">_</span>

Then execute `$ bundle` or `$ bundle install` to load the gems and update your `Gemfile.lock`.


## part 2 – set up for your search spec

> __Note:__ This example test assumes that you have search enabled on your Jekyll site, presumably with [Lunr](http://lunrjs.com) client-side search. I won't get into indexing your site with Lunr here (that will have to wait for another post), but if you have a working search bar with `id="search"`, and it dynamically generates html results with `class="results"`, this spec should work for you. For sample jQuery for dynamically showing search results, check out [this gist](https://gist.github.com/mnyrop/a0a8834e29a3d3ed403242660719f87b).



### _config.yml:<span style="display:none">_</span>

For our search spec specifically, you'll need to tell your `_config.yml` which pages have (unique) search bars/indexes and which terms you want to test on each of those pages.

In my example site, I have a full site search on `search .html` (which should yield results for `headless`, and `rack-jekyll`), and a tag-specific search on `tags.html` (which should yield results for `travis` and `poltergeist`).

You can specify as many pages and terms as you want, as long as you use the following structure with `search_tests`, a name, a `page`, and an array of `terms`:

```
# rspec test settings
search_tests:
  main:
    page: search.html
    terms:
      - headless
      - rack-jekyll
  tags:
    page: tags.html
    terms:
      - travis
      - poltergeist
```


## part 3 – write a helper spec

### spec_helper.rb:

Add the following to the `spec_helper.rb` file in your `spec` directory:

```ruby
# get necessary gems
require 'rspec'
require 'capybara/poltergeist'
require 'capybara/dsl'
require 'rack/jekyll'
require 'rack/test'

RSpec.configure do |config|
  config.include Capybara::DSL

  # get config info
  $jekyll_config = YAML.load_file('_config.yml')
  $baseurl = $jekyll_config['baseurl'].to_s
  $search_tests = $jekyll_config['search_tests']

  # set up capybara and register the jekyll site via rack
  Capybara.current_driver = :poltergeist
  Capybara.javascript_driver = :poltergeist
  Capybara.app = Rack::Jekyll.new(:force_build => false)
end
```
This will: hand your spec test the necessary gems, tell RSpec to use Capybara, tell Capybara to use Poltergeist, and tell rack-jekyll to register the Jekyll site. It will also read in your `baseurl` and `search_tests` info from your `_config.yml`, in order to correctly visit your pages and test the queries that you expect.

## part 4 – write a test spec

### lunr_spec.rb:

Add the following to the `lunr_spec.rb` file in your `spec` directory:

```ruby
$search_tests.each do |search| # for each search type listed, e.g. "main" and "tags"
  search_page = search[1]['page'] # get page
  terms = search[1]['terms'] # get array of terms

  describe search_page, :type => :feature, :js => true do
    before(:all) do
      visit($baseurl + "/" + search_page) # go to the search page
      @search_bar = find(:css, "#search") # identify the search bar
    end
    it "has a search bar." do
      expect(@search_bar) # confirm existence of search bar
    end
    terms.each do |term| # for each term
      context "when searching the term \"" + term + "\"" do
        before(:all) do
          @search_bar.set term # input the term in the search bar
          @result_link = first(".result").first("a")['href'] # get the first result's first link
        end
        after(:all) do
          visit($baseurl + "/" + search_page) # after searching a term, start back at main search page
        end
        it "yields at least 1 result" do
          expect(@result_link) # confirm at least 1 result with link
        end
        it "which sucessfully links to an existing page" do
          visit(@result_link) # go to linked result
          expect(status_code == 200) # confirm page exists (no 404 error, etc.)
        end
        it "which totally includes \"" + term + "\"" do
          expect(have_text(term)) # confirm result page includes the term in its body text
        end
      end
    end
  end
end
```

There are several types of "blocks" in Rspec tests including, primarily, `describe`, `context`, and `it ... do`. `describe` gives information about the test, `context` separates types of actions for the test, and `it ... do` blocks contain the actions and expectations themselves. Rspec tests should follow the format of...

```
something
  in one context
    does one thing
  in another context
    does another thing
```

... and should be very readable. For more information on formatting RSpec tests, I recommend exploring the documentation on  [Relish](https://relishapp.com/rspec/rspec-core/v/3-6/docs/example-groups/basic-structure-describe-it).


## results

When you run your Rspec test (either locally with `$ bundle exec rspec`) or via Git commit with Travis, you should see results logged that resemble the following:

```bash
$ bundle exec rspec

search.html
  has a search bar.
  when searching the term "headless"
    yields at least 1 result
    which sucessfully links to an existing page
    which totally includes "headless"
  when searching the term "rack-jekyll"
    yields at least 1 result
    which sucessfully links to an existing page
    which totally includes "rack-jekyll"
tags.html
  has a search bar.
  when searching the term "travis"
    yields at least 1 result
    which sucessfully links to an existing page
    which totally includes "travis"
  when searching the term "poltergeist"
    yields at least 1 result
    which sucessfully links to an existing page
    which totally includes "poltergeist

10 examples, 0 failures
```

If there are red lines and failed examples, it's time to troubleshoot and refactor until you see nothing but that sweet green. Either way, your headless test is now doing its job: simulating the actions of a user and warning you about issues in your code.
