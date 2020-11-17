# frozen_string_literal: true

require 'asciidoctor/extensions' unless RUBY_ENGINE == 'opal'
require_relative 'inline_phrase/extension'

Asciidoctor::Extensions.register do
  inline_macro Curs::AsciidoctorExtensions::PhraseInlineMacro
end
