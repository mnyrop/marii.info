# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "marii-theme"
  spec.version       = "0.1.0"
  spec.authors       = ["marii"]
  # spec.email         = [""]

  spec.summary       = %q{Personal jekyll theme based on louie by lillian chen.}
  # spec.homepage      = ""
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README)}i) }

  spec.add_runtime_dependency "jekyll", "~> 4.2"
end
