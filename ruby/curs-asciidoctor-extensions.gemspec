# frozen_string_literal: true

Gem::Specification.new do |s|
  s.name = 'curs-asciidoctor-extensions'
  s.version = '0.1.0'
  s.summary = 'Asciidoctor extensions by Curs.'
  s.description = 'Asciidoctor extensions by Curs.'

  s.authors = ['Guillaume Grossetie']
  s.email = ['ggrossetie@yuzutech.fr']
  s.homepage = 'https://github.com/Mogztter/curs-asciidoctor-extensions'
  s.license = 'MIT'
  s.metadata = {
    'bug_tracker_uri' => 'https://github.com/Mogztter/curs-asciidoctor-extensions/issues',
    'source_code_uri' => 'https://github.com/Mogztter/curs-asciidoctor-extensions'
  }
  s.files = `git ls-files`.split($RS)
  s.test_files = s.files.grep(%r{^(test|spec|features)/})
  s.require_paths = ['lib']

  s.add_runtime_dependency 'asciidoctor', '~> 2.0'
  s.add_runtime_dependency 'rouge', '~> 3.18'

  s.add_development_dependency 'asciidoctor-pdf', '1.5.3'
  s.add_development_dependency 'asciidoctor-revealjs', '~> 4.0'
  s.add_development_dependency 'rake', '~> 12.3.2'
  s.add_development_dependency 'rspec', '~> 3.8.0'
  s.add_development_dependency 'rubocop', '~> 0.74.0'
end
