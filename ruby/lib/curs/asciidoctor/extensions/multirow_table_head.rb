# frozen_string_literal: true

require 'asciidoctor/extensions' unless RUBY_ENGINE == 'opal'
require_relative 'multirow_table_head/extension'

# remove once https://github.com/asciidoctor/asciidoctor/pull/3532 is merged.
Asciidoctor::Extensions.register do
  tree_processor Curs::AsciidoctorExtensions::MultirowTableHeaderTreeProcessor
end
