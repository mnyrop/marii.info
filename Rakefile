require 'html-proofer'

desc 'run htmlproofer, rspec if .rspec file exists'
task :test do
  sh 'bundle exec jekyll clean'
  sh 'bundle exec jekyll build'
  opts = {
    check_html: true,
    ignore_missing_alt: true,
    allow_missing_href: true,
    enforce_https: true,
    disable_external: true,
    verbose: true
  }
  HTMLProofer.check_directory('./_site', opts).run
  sh 'bundle exec rspec' if File.exist? '.rspec'
end
