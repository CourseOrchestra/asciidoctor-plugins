# frozen_string_literal: true

require 'asciidoctor'
require_relative '../lib/curs/asciidoctor/extensions/multirow_table_head'

describe Curs::AsciidoctorExtensions::MultirowTableHeaderTreeProcessor do
  context 'convert to html5' do
    it 'should apply mark formatting on inline phrases' do
      input = <<~'ADOC'
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
        |====
      ADOC
      expected = <<~'HTML'
        <table class="tableblock frame-all grid-all stretch">
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
         </table>
      HTML
      output = Asciidoctor.convert(input)
      expect(output).to eql expected.split("\n").map(&:strip).join("\n")
    end
  end
end
