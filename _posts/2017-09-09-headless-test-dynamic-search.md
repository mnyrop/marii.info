---
layout: post
title:  "Continuous Integration II:<br>Unit Tests with RSpec, Capybara, and Poltergeist"
categories: main
date: 2017-09-12
sticky: true
---

<img src="http://bh-s2.azureedge.net/bh-uploads/2016/05/poltergeist-ii-moustache-skeleton.jpg" style="box-shadow: 2px 2px 4pc #23352a"/>
<sup>Still from ***Poltergeist III*** (1988), director: Gary Sherman.</sup>

__Gemfile__:

```yaml
source "https://rubygems.org"
gem "jekyll", "3.5.2"

group :development, :test do
  gem 'html-proofer'
  gem "rspec"
  gem 'capybara'
  gem 'launchy'
  gem 'poltergeist'
  gem "rack-jekyll"
end
```

**_config.yml**:

```yaml
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

**/spec/spec_helper.rb**:

```ruby
require 'rspec'
require 'capybara/poltergeist'
require 'capybara/dsl'
require 'rack/jekyll'
require 'rack/test'

RSpec.configure do |config|
  config.include Capybara::DSL

  $jekyll_config = YAML.load_file('_config.yml')
  $baseurl = $jekyll_config['baseurl'].to_s
  $search_tests = $jekyll_config['search_tests']

  Capybara.current_driver = :poltergeist
  Capybara.javascript_driver = :poltergeist
  Capybara.app = Rack::Jekyll.new(:force_build => false)
end
```

**.rspec**:

```
--color
--require spec_helper
--format documentation
```

**/spec/lunr_spec.rb**:

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

**jquery used for search bar and results**

```javascript
$(document).ready(function() {
  $('input#search').on('keyup', function () {
    var resultdiv = $('#results');
    // Get query
    var query = $(this).val();
    // Search for it
    var result = idx.search(query);
    // Show results
    resultdiv.empty();
    for (var item in result) {
      var ref = result[item].ref;
      var searchitem = '<div class="result"><a href="'+store[ref].link+'">'+store[ref].title+'</a></div>';
      resultdiv.append(searchitem);
    }
  });
});
```

**.travis.yml**

```yaml
language: ruby
rvm:
  - 2.4
script:
  - bundle exec jekyll build
  - bundle exec htmlproofer ./_site --only-4xx --check-html --assume-extension
    - NOKOGIRI_USE_SYSTEM_LIBRARIES=true
  - bundle exec rspec
```

**results**

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
