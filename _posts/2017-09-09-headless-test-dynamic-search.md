---
layout: post
title:  "Continuous Integration II:<br>Headless Tests with RSpec, Capybara, and Poltergeist"
categories: main
date: 2017-09-12
sticky: true
---

<img src="http://bh-s2.azureedge.net/bh-uploads/2016/05/poltergeist-ii-moustache-skeleton.jpg" style="box-shadow: 2px 2px 4pc #23352a;width:100%;margin-bottom:10px;"/>
<sup>Still from ***Poltergeist III*** (1988), director: Gary Sherman.</sup>

### What is a headless feature test?

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vulputate convallis nibh, nec vestibulum velit vestibulum ac. Sed sit amet volutpat arcu. Phasellus sit amet elit faucibus, sollicitudin erat at, commodo nisl. Nulla facilisi. Nunc vel nisi ultrices, tincidunt magna ac, semper nibh. Fusce consequat orci non dolor condimentum aliquam. Praesent mauris lectus, bibendum ac orci sit amet, facilisis tempus est. Duis sed metus nulla. Duis in elit est. Donec non porttitor est, vel aliquet orci. Aliquam sit amet euismod velit. Sed bibendum lacinia mauris vel consectetur. Cras scelerisque tempus felis et mollis. Curabitur imperdiet consequat risus. Phasellus eget bibendum mi. Donec sed efficitur neque.

### What tools do we need?

__Praesent mauris__ lectus, bibendum ac orci sit amet, facilisis tempus est. Duis sed metus nulla. Duis in elit est.

__Praesent mauris__ lectus, bibendum ac orci sit amet, facilisis tempus est. Duis sed metus nulla. Duis in elit est.

__Praesent__ mauris lectus, bibendum ac orci sit amet, facilisis tempus est. Duis sed metus nulla. Duis in elit est.

### Example: testing your site search

Duis sed metus nulla. Duis in elit est. Donec non porttitor est, vel aliquet orci. Aliquam sit amet euismod velit. Sed bibendum lacinia mauris vel consectetur. Cras scelerisque tempus felis et mollis. Curabitur imperdiet consequat risus. Phasellus eget bibendum mi. Donec sed efficitur neque.

### part 1 – rspec configuration

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

**.rspec**:

Next add an `.rspec` file to the root of your site, and give it the following information:

```
--require spec_helper
--color
--format documentation
```

__Gemfile:__

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

__.travis.yml:__

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


<img src="http://www.elotrocine.cl/wp-content/uploads/2015/06/poltergeist1982b.jpg" style="box-shadow: 2px 2px 4pc #23352a;width:100%;margin-top:40px;margin-bottom:10px;"/>
<sup>Another amazing and gratuitous till, this time from the first ***Poltergeist*** (1982), director: Tobe Hooper.</sup>


### part 2 – setup for search test

__Note:__ This example test assumes that you have search enabled on your Jekyll site, presumably with [Lunr](http://lunrjs.com) client-side search. I won't get into indexing your site with Lunr here (that will have to wait for another post), but if you have a working search bar with `id="search"`, and it dynamically generates results with `class=results`, the test will work for you. For sample jQuery for dynamically showing results, checkout [this gist](https://gist.github.com/mnyrop/a0a8834e29a3d3ed403242660719f87b).



**_config.yml**:

For the search test specifically, you'll need to tell your `_config.yml` which pages have (unique) search bars/indexes and which terms you want to test on each of those pages.

In my example site, I have a full site search on `search .html` (which should yield results for `headless`, and `rack-jekyll`), and a tag-specific search on `tags.html` (which should yield results for `travis` and `poltergeist`).

You can specify as many pages and terms as you want, as long as you use the following structure, with `search_tests`, a name, a `page`, and an array of `terms`:

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

<center><img src="http://www.claudinho.com.br/wp-content/uploads/2015/12/capivara-sem-fundo.png" style="width:70%;margin-top:40px;margin-bottom:10px;"/>
<br><sup>An altogether unjustifiable image of a <a href="https://en.wikipedia.org/wiki/Capybara_(software)">Capybara</a>.</sup></center>


### part 3 – write a helper spec

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
This will: hand your spec test the necessary gems, tell RSpec to use Capybara, tell Capybara to use Poltergeist, and tell rack-jekyll to register the Jekyll site. It will also read in your `baseurl` and `search_tests` info from your `_config.yml`, in order to correctly visit your pages and test the searches the you want.

### part 4 – write a test spec

Add the following to the `lunr_spec.rb` file in your `spec` directory:

```ruby
$search_tests.each do |search|
  search_page = search[1]['page']
  terms = search[1]['terms']

  describe search_page, :type => :feature, :js => true do
    before(:all) do
      visit($baseurl + "/" + search_page)
      @search_bar = find(:css, "#search")
    end
    it "has a search bar." do
      expect(@search_bar)
    end
    terms.each do |term|
      context "when searching the term \"" + term + "\"" do
        before(:all) do
          @search_bar.set term
          @result_link = first(".result").first("a")['href']
        end
        after(:all) do
          visit($baseurl + "/" + search_page)
        end
        it "yields at least 1 result" do
          expect(@result_link)
        end
        it "which sucessfully links to an existing page" do
          visit(@result_link)
          expect(status_code == 200)
        end
        it "which totally includes \"" + term + "\"" do
          expect(have_text(term))
        end
      end
    end
  end
end
```

### results

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
