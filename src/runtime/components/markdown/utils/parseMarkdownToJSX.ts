import { Marked } from 'marked'
import type { parseMarkdownToJSXProps } from './types'
import { initRenderer } from './utils'

/** Render Markdown to HTML with the styles inlined on every element. */
export const parseMarkdownToJSX = ({ markdown, customStyles }: parseMarkdownToJSXProps) =>
  new Marked({ renderer: initRenderer({ customStyles }) }).parse(markdown, { async: false })
