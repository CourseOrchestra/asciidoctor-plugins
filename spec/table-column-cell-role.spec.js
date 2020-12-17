/* global describe it */
const chai = require('chai')
const expect = chai.expect

const asciidoctor = require('@asciidoctor/core')()
require('../lib/table-column-cell-role.js')

describe('Table with column role specifications', () => {
  it('should produce a table with column roles', () => {
    const input = `
[cols="1[.is-borderless],1[.has-background-dark.has-text-danger.is-borderless]"]
|===
|Cell in column 1, row 1
|Cell in column 2, row 1

|Cell in column 1, row 2
|Cell in column 2, row 2
|===
`
    const expected = `
<table class="tableblock frame-all grid-all stretch">
  <colgroup>
    <col style="width: 50%;">
    <col style="width: 50%;">
  </colgroup>
  <tbody>
    <tr>
      <td class="tableblock halign-left valign-top is-borderless"><p class="tableblock">Cell in column 1, row 1</p></td>
      <td class="tableblock halign-left valign-top has-background-dark has-text-danger is-borderless"><p class="tableblock">Cell in column 2, row 1</p></td>
    </tr>
    <tr>
      <td class="tableblock halign-left valign-top is-borderless"><p class="tableblock">Cell in column 1, row 2</p></td>
      <td class="tableblock halign-left valign-top has-background-dark has-text-danger is-borderless"><p class="tableblock">Cell in column 2, row 2</p></td>
    </tr>
    </tbody>
  </table>`

    const output = asciidoctor.convert(input)
    expect(output).to.equal(expected.split('\n').map((line) => line.trim()).join('\n').trim())
  })
})

/*
it 'should produce a table with column and cell roles' do
input = <<~'ADOC'
[cols="1,1[.has-text-info],1[.has-text-white.has-background-grey-light.is-borderless]"]
|====
.3+|Heading in column 1, rows 1-3
2+|Heading in columns 2-3, row 1
|Heading in column 2, row 2

|Heading in column 3, row 2
|Heading in column 2, row 3
|Heading in column 3, row 3

[.is-uppercase]|Cell in column 1, row 4
|Cell in column 2, row 4
|Cell in column 3, row 4

|Cell in column 1, row 5
|Cell in column 2, row 5
|Cell in column 3, row 5

[.is-italic.has-text-success]|Cell in column 1, row 6
[.is-lowercase]|Cell in column 2, row 6
|Cell in column 3, row 6
|====
ADOC
expected = <<~'HTML'
<table class="tableblock frame-all grid-all stretch">
<colgroup>
<col style="width: 33.3333%;">
<col style="width: 33.3333%;">
<col style="width: 33.3334%;">
</colgroup>
<tbody>
<tr>
<td class="tableblock halign-left valign-top" rowspan="3"><p class="tableblock">Heading in column 1, rows 1-3</p></td>
<td class="tableblock halign-left valign-top has-text-info" colspan="2"><p class="tableblock">Heading in columns 2-3, row 1</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock">Heading in column 2, row 2</p></td>
<td class="tableblock halign-left valign-top has-text-info"><p class="tableblock">Heading in column 3, row 2</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock">Heading in column 2, row 3</p></td>
<td class="tableblock halign-left valign-top has-text-info"><p class="tableblock">Heading in column 3, row 3</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top is-uppercase"><p class="tableblock">Cell in column 1, row 4</p></td>
<td class="tableblock halign-left valign-top has-text-info"><p class="tableblock">Cell in column 2, row 4</p></td>
<td class="tableblock halign-left valign-top has-text-white has-background-grey-light is-borderless"><p class="tableblock">Cell in column 3, row 4</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock">Cell in column 1, row 5</p></td>
<td class="tableblock halign-left valign-top has-text-info"><p class="tableblock">Cell in column 2, row 5</p></td>
<td class="tableblock halign-left valign-top has-text-white has-background-grey-light is-borderless"><p class="tableblock">Cell in column 3, row 5</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top is-italic has-text-success"><p class="tableblock">Cell in column 1, row 6</p></td>
<td class="tableblock halign-left valign-top has-text-info is-lowercase"><p class="tableblock">Cell in column 2, row 6</p></td>
<td class="tableblock halign-left valign-top has-text-white has-background-grey-light is-borderless"><p class="tableblock">Cell in column 3, row 6</p></td>
</tr>
</tbody>
</table>
HTML
output = Asciidoctor.convert(input)
expect(output).to eql expected.split("\n").map(&:strip).join("\n")
end
end
end
*/
