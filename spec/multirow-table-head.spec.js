/* global describe it */
const chai = require('chai')
const expect = chai.expect

const multirowTableHeadTreeProcessorExtension = require('../lib/multirow-table-head-tree-processor.js')
const asciidoctor = require('@asciidoctor/core')()

describe('Multirow table head extension', () => {
  it('should use post method when kroki-http-method value is post', () => {
    const registry = asciidoctor.Extensions.create()
    multirowTableHeadTreeProcessorExtension.register(registry)
    const input = `
[cols=3,hrows=2]
|====
| A1
| B1
| C1

| A2
| B2
| C2

| A3
| B3
| C3
|====`
    const result = asciidoctor.convert(input, { extension_registry: registry })
    const expected = `<table class="tableblock frame-all grid-all stretch">
<colgroup>
<col style="width: 33.3333%;">
<col style="width: 33.3333%;">
<col style="width: 33.3334%;">
</colgroup>
<thead>
<tr>
<th class="tableblock halign-left valign-top">A1</th>
<th class="tableblock halign-left valign-top">B1</th>
<th class="tableblock halign-left valign-top">C1</th>
</tr>
<tr>
<th class="tableblock halign-left valign-top">A2</th>
<th class="tableblock halign-left valign-top">B2</th>
<th class="tableblock halign-left valign-top">C2</th>
</tr>
</thead>
<tbody>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock">A3</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">B3</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">C3</p></td>
</tr>
</tbody>
</table>`
    expect(result).to.equal(expected)
  })
})
