---
layout: post
title:  "Headless test Jekyll search with Travis, RSpec, Capybara, and Poltergeist"
categories: main
date: 2017-08-26
sticky: false
---

__Gemfile__:

```yaml
source "https://rubygems.org"
gem "jekyll", "~>3.5.0"
gem 'html-proofer'

group :development, :test do
  gem "rspec"
  gem 'capybara'
  gem 'launchy'
  gem 'poltergeist'
  gem "rack-jekyll"
end
```

**.rspec**:

```
--color
--require spec_helper
--format documentation
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
  $baseurl = $jekyll_config['baseurl']
  $search_tests = $jekyll_config['search_tests']

  Capybara.current_driver = :poltergeist
  Capybara.javascript_driver = :poltergeist
  Capybara.app = Rack::Jekyll.new(:force_build => false, :baseurl => $baseurl)
end
```

**_config.yml**:

```yaml
# rspec test settings
search_tests:
  full:
    page: search.html
    term: poltergeist
  tags:
    page: tags.html
    term: jekyll
```

**/spec/lunr_spec.rb**:

```ruby

$search_tests.each do |search|
  search_page = search[1]['page']
  term = search[1]['term']

  describe search_page, :type => :feature, :js => true do
    it "has a search bar" do
      visit($baseurl + "/" + search_page)
      expect(find(:css, "#search"))
      $search_bar = find(:css, "#search")
    end
    it "which yields at least 1 result for \"" + term + "\"" do
      $search_bar.set term
      expect(have_css(".result"))
    end
    it "which successfully links to an existing page" do
      $search_bar.set term
      @result_link = first(".result").first("a")['href']
      visit(@result_link)
      expect(status_code == 200)
    end
    it "which totally includes the term \"" + term + "\"." do
      expect(have_text(term))
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
    has a search bar
    which yields at least 1 result for "poltergeist"
    which successfully links to an existing page
    which totally includes the term "poltergeist"
  tags.html
    has a search bar
    which yields at least 1 result for "jekyll"
    which successfully links to an existing page
    which totally includes the term "jekyll"

  8 examples, 0 failures
  The command "bundle exec rspec" exited with 0.
```
