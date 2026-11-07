import type { CSSProperties } from 'vue'
import type { RendererObject, Tokens } from 'marked'
import type { StylesType, initRendererProps } from './types'
import { styles } from './styles'

function escapeQuotes(value: unknown) {
  if (typeof value === 'string' && value.includes('"')) {
    return value.replace(/"/g, '&#x27;')
  }
  return value
}

export function camelToKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

export function parseCssInJsToInlineCss(
  cssProperties: CSSProperties | undefined,
): string {
  if (!cssProperties) return ''

  const numericalCssProperties = [
    'width',
    'height',
    'margin',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    'padding',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'borderWidth',
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'outlineWidth',
    'top',
    'right',
    'bottom',
    'left',
    'fontSize',
    'lineHeight',
    'letterSpacing',
    'wordSpacing',
    'maxWidth',
    'minWidth',
    'maxHeight',
    'minHeight',
    'borderRadius',
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
    'textIndent',
    'gridColumnGap',
    'gridRowGap',
    'gridGap',
    'translateX',
    'translateY',
  ]

  return Object.entries(cssProperties)
    .map(([property, value]) => {
      if (
        typeof value === 'number'
        && numericalCssProperties.includes(property)
      ) {
        return `${camelToKebabCase(property)}:${value}px`
      }
      else {
        const escapedValue = escapeQuotes(value)
        return `${camelToKebabCase(property)}:${escapedValue}`
      }
    })
    .join(';')
}

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#39;',
}

function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, char => HTML_ESCAPES[char]!)
}

/** Renderer for marked that inlines the styles on every element. */
export const initRenderer = ({ customStyles }: initRendererProps): RendererObject => {
  const finalStyles: StylesType = { ...styles, ...customStyles }
  /** ` style="..."` for an element, or nothing when it has no styles. */
  const style = (key: keyof StylesType) => {
    const css = parseCssInJsToInlineCss(finalStyles[key])
    return css ? ` style="${css}"` : ''
  }

  return {
    blockquote({ tokens }) {
      return `<blockquote${style('blockQuote')}>\n${this.parser.parse(tokens)}</blockquote>\n`
    },
    br() {
      return `<br${style('br')} />`
    },
    code({ text }) {
      return `<pre${style('codeBlock')}><code>${escapeHtml(text.replace(/\n$/, '') + '\n')}</code></pre>\n`
    },
    codespan({ text }) {
      return `<code${style('codeInline')}>${escapeHtml(text)}</code>`
    },
    del({ tokens }) {
      return `<del${style('strikethrough')}>${this.parser.parseInline(tokens)}</del>`
    },
    em({ tokens }) {
      return `<em${style('italic')}>${this.parser.parseInline(tokens)}</em>`
    },
    heading({ tokens, depth }) {
      return `<h${depth}${style(`h${depth}` as keyof StylesType)}>${this.parser.parseInline(tokens)}</h${depth}>`
    },
    hr() {
      return `<hr${style('hr')} />\n`
    },
    image({ href, text, tokens }) {
      const alt = tokens ? this.parser.parseInline(tokens, this.parser.textRenderer) : text
      return `<img src="${href}" alt="${alt}"${style('image')}>`
    },
    link({ href, tokens }) {
      return `<a href="${href}" target="_blank"${style('link')}>${this.parser.parseInline(tokens)}</a>`
    },
    list(token) {
      const type = token.ordered ? 'ol' : 'ul'
      const start = token.ordered && token.start !== 1 ? ` start="${token.start}"` : ''
      const body = token.items.map(item => this.listitem(item)).join('')
      return `<${type}${start}${style(type)}>\n${body}</${type}>\n`
    },
    listitem(item) {
      return `<li${style('li')}>${this.parser.parse(item.tokens)}</li>\n`
    },
    paragraph({ tokens }) {
      return `<p${style('p')}>${this.parser.parseInline(tokens)}</p>\n`
    },
    strong({ tokens }) {
      return `<strong${style('bold')}>${this.parser.parseInline(tokens)}</strong>`
    },
    table(token) {
      const row = (cells: Tokens.TableCell[]) => this.tablerow({ text: cells.map(cell => this.tablecell(cell)).join('') })
      const header = row(token.header)
      const body = token.rows.map(row).join('')
      return `<table${style('table')}>\n<thead${style('thead')}>\n${header}</thead>\n${body ? `<tbody>${body}</tbody>` : ''}</table>\n`
    },
    tablecell(token) {
      const type = token.header ? 'th' : 'td'
      const align = token.align ? ` align="${token.align}"` : ''
      return `<${type}${align}${style('td')}>${this.parser.parseInline(token.tokens)}</${type}>\n`
    },
    tablerow({ text }) {
      return `<tr${style('tr')}>\n${text}</tr>\n`
    },
  }
}
