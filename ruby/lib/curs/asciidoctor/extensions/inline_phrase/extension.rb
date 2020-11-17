# frozen_string_literal: true

require 'asciidoctor/extensions' unless RUBY_ENGINE == 'opal'

module Curs
  # Asciidoctor extensions by Curs
  module AsciidoctorExtensions
    include Asciidoctor

    # Apply formatting on inline phrases.
    #
    # Usage:
    #
    # phrase:mark[text,role="fragment highlight-red",data-fragment-index=1]
    #
    # This syntax is a bit more verbose than [.fragment.highlight-red]#text#
    # but you can define custom attributes (which is not possible using formatting marks).
    class PhraseInlineMacro < Extensions::InlineMacroProcessor
      use_dsl
      named :phrase
      positional_attributes :content

      def process(parent, target, attrs)
        text = attrs[:content]
        opts = { attributes: attrs, type: target.to_sym }
        create_inline parent, :quoted, text, opts
      end
    end
  end
end
