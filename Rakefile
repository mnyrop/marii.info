require 'html-proofer'

desc 'run htmlproofer, rspec if .rspec file exists'
task :test do
  sh 'bundle exec jekyll clean'
  sh 'bundle exec jekyll build'
  opts = {
    # allow_hash_href: true,
    check_html: true,
    assume_extension: true,
    empty_alt_ignore: true,
    enforce_https: true,
    disable_external: true,
    verbose: true
  }
  HTMLProofer.check_directory('./_site', opts).run
  sh 'bundle exec rspec' if File.exist? '.rspec'
end
