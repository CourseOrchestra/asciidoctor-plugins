/* global describe it */
const chai = require('chai')
const expect = chai.expect

const phraseInlineMacroExtension = require('../lib/phrase-inline-macro.js')
const asciidoctor = require('@asciidoctor/core')()

describe('Phrase inline macro extension', () => {
  it('should apply mark formatting on inline phrases', () => {
    const registry = asciidoctor.Extensions.create()
    phraseInlineMacroExtension.register(registry)
    const input = 'phrase:mark[text,role="fragment highlight-red"]'
    const output = asciidoctor.convert(input, { doctype: 'inline', extension_registry: registry })
    expect(output).to.equal('<mark class="fragment highlight-red">text</mark>')
  })
  it('should apply monospaced formatting on inline phrases', () => {
    const registry = asciidoctor.Extensions.create()
    phraseInlineMacroExtension.register(registry)
    const input = 'phrase:monospaced[text,role="fragment highlight-red"]'
    const output = asciidoctor.convert(input, { doctype: 'inline', extension_registry: registry })
    expect(output).to.equal('<code class="fragment highlight-red">text</code>')
  })
  it('should apply emphasis formatting on inline phrases', () => {
    const registry = asciidoctor.Extensions.create()
    phraseInlineMacroExtension.register(registry)
    const input = 'phrase:emphasis[text,role="fragment highlight-red"]'
    const output = asciidoctor.convert(input, { doctype: 'inline', extension_registry: registry })
    expect(output).to.equal('<em class="fragment highlight-red">text</em>')
  })
  it('should apply strong formatting on inline phrases', () => {
    const registry = asciidoctor.Extensions.create()
    phraseInlineMacroExtension.register(registry)
    const input = 'phrase:strong[text,role="fragment highlight-red"]'
    const output = asciidoctor.convert(input, { doctype: 'inline', extension_registry: registry })
    expect(output).to.equal('<strong class="fragment highlight-red">text</strong>')
  })
  it('should apply superscript formatting on inline phrases', () => {
    const registry = asciidoctor.Extensions.create()
    phraseInlineMacroExtension.register(registry)
    const input = 'phrase:superscript[text,role="fragment highlight-red"]'
    const output = asciidoctor.convert(input, { doctype: 'inline', extension_registry: registry })
    expect(output).to.equal('<sup class="fragment highlight-red">text</sup>')
  })
  it('should apply subscript formatting on inline phrases', () => {
    const registry = asciidoctor.Extensions.create()
    phraseInlineMacroExtension.register(registry)
    const input = 'phrase:subscript[text,role="fragment highlight-red"]'
    const output = asciidoctor.convert(input, { doctype: 'inline', extension_registry: registry })
    expect(output).to.equal('<sub class="fragment highlight-red">text</sub>')
  })
  it('should apply formatting on inline phrases', () => {
    const registry = asciidoctor.Extensions.create()
    phraseInlineMacroExtension.register(registry)
    const input = 'phrase:#[text,role="fragment highlight-red"]'
    const output = asciidoctor.convert(input, { doctype: 'inline', extension_registry: registry })
    expect(output).to.equal('<span class="fragment highlight-red">text</span>')
  })
  describe('Load document', () => {
    it('should preserve attributes', () => {
      class CustomHtml5Converter {
        constructor () {
          this.baseConverter = asciidoctor.Html5Converter.$new()
        }
        convert (node, transform) {
          if (node.getNodeName() === 'inline_quoted') {
            const dataAttrs = Object.entries(node.getAttributes())
              .filter(([key, _]) => key.startsWith('data-'))
              .map(([key, value]) => `${key}="${value}"`)
              .join(' ')
            return `<${node.getType()}${dataAttrs ? ` ${dataAttrs}` : ''}>${node.getText()}</${node.getType()}>`
          }
          return this.baseConverter.convert(node, transform)
        }
      }
      asciidoctor.ConverterFactory.register(new CustomHtml5Converter(), ['custom-html5'])
      const registry = asciidoctor.Extensions.create()
      phraseInlineMacroExtension.register(registry)
      const input = 'phrase:strong[text,data-fragment-index=1]'
      const doc = asciidoctor.load(input, { doctype: 'inline', extension_registry: registry, backend: 'custom-html5' })
      expect(doc.convert()).to.equal('<strong data-fragment-index="1">text</strong>')
    })
  })
})
