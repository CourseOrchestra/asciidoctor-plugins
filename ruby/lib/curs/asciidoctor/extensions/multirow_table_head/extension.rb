# frozen_string_literal: true

require 'asciidoctor/extensions' unless RUBY_ENGINE == 'opal'

module Curs
  # Asciidoctor extensions by Curs
  module AsciidoctorExtensions
    include Asciidoctor

    # Allow to declare multiple rows as header.
    #
    # Usage:
    #
    # [cols=3,hrows=2]
    # |====
    # | A1
    # | B1
    # | C1
    #
    # | A2
    # | B2
    # | C2
    #
    # | A3
    # | B3
    # | C3
    # |====
    #
    class MultirowTableHeaderTreeProcessor < Extensions::TreeProcessor
      def process(doc)
        doc.find_by(context: :table, traverse_documents: true).each do |table|
          hrows = table.attr('hrows')
          next unless hrows

          rows = table.rows
          move_rows = [hrows.to_i - rows.head.size, rows.body.size].min
          rows.head.push(*rows.body.slice!(0, move_rows)) if move_rows.positive?
        end
      end
    end
  end
end
