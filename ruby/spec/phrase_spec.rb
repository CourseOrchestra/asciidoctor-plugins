# frozen_string_literal: true

require 'asciidoctor'
require_relative '../lib/curs/asciidoctor/extensions/phrase_inline_macro'

describe Curs::AsciidoctorExtensions::PhraseInlineMacro do
  context 'convert to html5' do
    it 'should apply mark formatting on inline phrases' do
      input = <<~'ADOC'
        phrase:mark[text,role="fragment highlight-red"]
      ADOC
      output = Asciidoctor.convert(input, doctype: 'inline')
      expect(output).to eql '<mark class="fragment highlight-red">text</mark>'
    end
    it 'should apply monospaced formatting on inline phrases' do
      input = <<~'ADOC'
        phrase:monospaced[text,role="fragment highlight-red"]
      ADOC
      output = Asciidoctor.convert(input, doctype: 'inline')
      expect(output).to eql '<code class="fragment highlight-red">text</code>'
    end
    it 'should apply emphasis formatting on inline phrases' do
      input = <<~'ADOC'
        phrase:emphasis[text,role="fragment highlight-red"]
      ADOC
      output = Asciidoctor.convert(input, doctype: 'inline')
      expect(output).to eql '<em class="fragment highlight-red">text</em>'
    end
    it 'should apply strong formatting on inline phrases' do
      input = <<~'ADOC'
        phrase:strong[text,role="fragment highlight-red"]
      ADOC
      output = Asciidoctor.convert(input, doctype: 'inline')
      expect(output).to eql '<strong class="fragment highlight-red">text</strong>'
    end
    it 'should apply superscript formatting on inline phrases' do
      input = <<~'ADOC'
        phrase:superscript[text,role="fragment highlight-red"]
      ADOC
      output = Asciidoctor.convert(input, doctype: 'inline')
      expect(output).to eql '<sup class="fragment highlight-red">text</sup>'
    end
    it 'should apply subscript formatting on inline phrases' do
      input = <<~'ADOC'
        phrase:subscript[text,role="fragment highlight-red"]
      ADOC
      output = Asciidoctor.convert(input, doctype: 'inline')
      expect(output).to eql '<sub class="fragment highlight-red">text</sub>'
    end
    it 'should apply formatting on inline phrases' do
      input = <<~'ADOC'
        phrase:#[text,role="fragment highlight-red"]
      ADOC
      output = Asciidoctor.convert(input, doctype: 'inline')
      expect(output).to eql '<span class="fragment highlight-red">text</span>'
    end
  end
  context 'load to document' do
    it 'should preserve attributes' do
      input = <<~'ADOC'
        phrase:strong[text,data-fragment-index=1]
      ADOC

      class CustomHtml5Converter < (Asciidoctor::Converter.for 'html5')
        register_for 'html5'

        def convert_inline_quoted(node)
          data_attrs = (node.attributes.select do |key, _|
            key.to_s.start_with? 'data-'
          end).map do |key, value|
            %(#{key}="#{value}")
          end.join(' ')
          %(<#{node.type}#{data_attrs ? " #{data_attrs}" : ''}>#{node.text}</#{node.type}>)
        end
      end

      doc = Asciidoctor.load(input, doctype: 'inline')
      expect(doc.convert).to eql '<strong data-fragment-index="1">text</strong>'
    end
  end
end
