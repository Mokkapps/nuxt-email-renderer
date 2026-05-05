import type { CSSProperties } from 'vue'
import type { Tokens } from 'marked'
import type { StylesType, initRendererProps } from './types'
import { Renderer } from 'marked'
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

class CustomRenderer extends Renderer {
  private readonly finalStyles: StylesType

  constructor(finalStyles: StylesType) {
    super()
    this.finalStyles = finalStyles
  }

  override blockquote(token: Tokens.Blockquote): string {
    const body = this.parser.parse(token.tokens)
    return `<blockquote${
      parseCssInJsToInlineCss(this.finalStyles.blockQuote) !== ''
        ? ` style="${parseCssInJsToInlineCss(this.finalStyles.blockQuote)}"`
        : ''
    }>\n${body}</blockquote>\n`
  }

  override br(_token: Tokens.Br): string {
    return `<br${
      parseCssInJsToInlineCss(this.finalStyles.br) !== ''
        ? ` style="${parseCssInJsToInlineCss(this.finalStyles.br)}"`
        : ''
    } />`
  }

  override code(token: Tokens.Code): string {
    const code = token.text.replace(/\n$/, '') + '\n'
    return `<pre${
      parseCssInJsToInlineCss(this.finalStyles.codeBlock) !== ''
        ? ` style="${parseCssInJsToInlineCss(this.finalStyles.codeBlock)}"`
        : ''
    }><code>${code}</code></pre>\n`
  }

  override codespan(token: Tokens.Codespan): string {
    return `<code${
      parseCssInJsToInlineCss(this.finalStyles.codeInline) !== ''
        ? ` style="${parseCssInJsToInlineCss(this.finalStyles.codeInline)}"`
        : ''
    }>${token.text}</code>`
  }

  override del(token: Tokens.Del): string {
    const text = this.parser.parseInline(token.tokens)
    return `<del${
      parseCssInJsToInlineCss(this.finalStyles.strikethrough) !== ''
        ? ` style="${parseCssInJsToInlineCss(this.finalStyles.strikethrough)}"`
        : ''
    }>${text}</del>`
  }

  override em(token: Tokens.Em): string {
    const text = this.parser.parseInline(token.tokens)
    return `<em${
      parseCssInJsToInlineCss(this.finalStyles.italic) !== ''
        ? ` style="${parseCssInJsToInlineCss(this.finalStyles.italic)}"`
        : ''
    }>${text}</em>`
  }

  override heading(token: Tokens.Heading): string {
    const text = this.parser.parseInline(token.tokens)
    const level = token.depth
    return `<h${level}${
      parseCssInJsToInlineCss(
        this.finalStyles[`h${level}` as keyof StylesType],
      ) !== ''
        ? ` style="${parseCssInJsToInlineCss(
          this.finalStyles[`h${level}` as keyof StylesType],
        )}"`
        : ''
    }>${text}</h${level}>`
  }

  override hr(_token: Tokens.Hr): string {
    return `<hr${
      parseCssInJsToInlineCss(this.finalStyles.hr) !== ''
        ? ` style="${parseCssInJsToInlineCss(this.finalStyles.hr)}"`
        : ''
    } />\n`
  }

  override image(token: Tokens.Image): string {
    return `<img src="${token.href}" alt="${token.text}"${
      parseCssInJsToInlineCss(this.finalStyles.image) !== ''
        ? ` style="${parseCssInJsToInlineCss(this.finalStyles.image)}"`
        : ''
    }>`
  }

  override link(token: Tokens.Link): string {
    const text = this.parser.parseInline(token.tokens)
    return `<a href="${token.href}" target="_blank"${
      parseCssInJsToInlineCss(this.finalStyles.link) !== ''
        ? ` style="${parseCssInJsToInlineCss(this.finalStyles.link)}"`
        : ''
    }>${text}</a>`
  }

  override list(token: Tokens.List): string {
    const type = token.ordered ? 'ol' : 'ul'
    const startatt = token.ordered && token.start !== 1 ? ` start="${token.start}"` : ''
    const styleStr = parseCssInJsToInlineCss(
      this.finalStyles[token.ordered ? 'ol' : 'ul'],
    )
    let body = ''
    for (const item of token.items) {
      body += this.listitem(item)
    }
    return (
      '<'
      + type
      + startatt
      + `${styleStr !== '' ? ` style="${styleStr}"` : ''}>\n`
      + body
      + '</'
      + type
      + '>\n'
    )
  }

  override listitem(token: Tokens.ListItem): string {
    return `<li${
      parseCssInJsToInlineCss(this.finalStyles.li) !== ''
        ? ` style="${parseCssInJsToInlineCss(this.finalStyles.li)}"`
        : ''
    }>${this.parser.parse(token.tokens)}</li>\n`
  }

  override paragraph(token: Tokens.Paragraph): string {
    const text = this.parser.parseInline(token.tokens)
    return `<p${
      parseCssInJsToInlineCss(this.finalStyles.p) !== ''
        ? ` style="${parseCssInJsToInlineCss(this.finalStyles.p)}"`
        : ''
    }>${text}</p>\n`
  }

  override strong(token: Tokens.Strong): string {
    const text = this.parser.parseInline(token.tokens)
    return `<strong${
      parseCssInJsToInlineCss(this.finalStyles.bold) !== ''
        ? ` style="${parseCssInJsToInlineCss(this.finalStyles.bold)}"`
        : ''
    }>${text}</strong>`
  }

  override table(token: Tokens.Table): string {
    let headerContent = ''
    for (const cell of token.header) {
      headerContent += this.tablecell(cell)
    }
    const header = this.tablerow({ text: headerContent })
    let bodyContent = ''
    for (const row of token.rows) {
      let rowContent = ''
      for (const cell of row) {
        rowContent += this.tablecell(cell)
      }
      bodyContent += this.tablerow({ text: rowContent })
    }
    const body = bodyContent ? `<tbody>${bodyContent}</tbody>` : ''
    return `<table${
      parseCssInJsToInlineCss(this.finalStyles.table) !== ''
        ? ` style="${parseCssInJsToInlineCss(this.finalStyles.table)}"`
        : ''
    }>\n<thead${
      parseCssInJsToInlineCss(this.finalStyles.thead) !== ''
        ? ` style="${parseCssInJsToInlineCss(this.finalStyles.thead)}"`
        : ''
    }>\n${header}</thead>\n${body}</table>\n`
  }

  override tablecell(token: Tokens.TableCell): string {
    const content = this.parser.parseInline(token.tokens)
    const type = token.header ? 'th' : 'td'
    const tag = token.align
      ? `<${type} align="${token.align}"${
        parseCssInJsToInlineCss(this.finalStyles.td) !== ''
          ? ` style="${parseCssInJsToInlineCss(this.finalStyles.td)}"`
          : ''
      }>`
      : `<${type}${
        parseCssInJsToInlineCss(this.finalStyles.td) !== ''
          ? ` style="${parseCssInJsToInlineCss(this.finalStyles.td)}"`
          : ''
      }>`
    return tag + content + `</${type}>\n`
  }

  override tablerow(token: Tokens.TableRow): string {
    return `<tr${
      parseCssInJsToInlineCss(this.finalStyles.tr) !== ''
        ? ` style="${parseCssInJsToInlineCss(this.finalStyles.tr)}"`
        : ''
    }>\n${token.text}</tr>\n`
  }
}

export const initRenderer = ({
  customStyles,
}: initRendererProps): Renderer => {
  const finalStyles = { ...styles, ...customStyles }
  return new CustomRenderer(finalStyles)
}
