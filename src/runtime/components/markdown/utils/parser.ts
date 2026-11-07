import { Marked } from 'marked'
import type { StylesType } from './types'
import { initRenderer } from './utils'

export class MarkdownParser {
  private readonly marked: Marked

  constructor({ customStyles }: { customStyles?: StylesType }) {
    this.marked = new Marked({ renderer: initRenderer({ customStyles }) })
  }

  parse(markdown: string) {
    return this.marked.parse(markdown, { async: false })
  }
}
