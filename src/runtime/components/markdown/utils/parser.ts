import type { Renderer } from 'marked'
import { marked } from 'marked'
import type { StylesType } from './types'
import { initRenderer } from './utils'

export class MarkdownParser {
  private readonly renderer: Renderer

  constructor({ customStyles }: { customStyles?: StylesType }) {
    this.renderer = initRenderer({ customStyles })
  }

  parse(markdown: string) {
    return marked.parse(markdown, { renderer: this.renderer })
  }
}
