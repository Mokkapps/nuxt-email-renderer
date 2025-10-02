import type { CSSProperties } from 'vue'
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

export const initRenderer = ({
  customStyles,
}: initRendererProps): Renderer => {
  const finalStyles = { ...styles, ...customStyles }

  const customRenderer = new Renderer()

  customRenderer.blockquote = (quote) => {
    return `<blockquote${
      parseCssInJsToInlineCss(finalStyles.blockQuote) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.blockQuote)}"`
        : ''
    }>\n${quote}</blockquote>\n`
  }

  customRenderer.br = () => {
    return `<br${
      parseCssInJsToInlineCss(finalStyles.br) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.br)}"`
        : ''
    } />`
  }

  customRenderer.code = (code) => {
    code = code.replace(/\n$/, '') + '\n'

    return `<pre${
      parseCssInJsToInlineCss(finalStyles.codeBlock) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.codeBlock)}"`
        : ''
    }><code>${code}</code></pre>\n`
  }

  customRenderer.codespan = (text) => {
    return `<code${
      parseCssInJsToInlineCss(finalStyles.codeInline) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.codeInline)}"`
        : ''
    }>${text}</code>`
  }

  customRenderer.del = (text) => {
    return `<del${
      parseCssInJsToInlineCss(finalStyles.strikethrough) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.strikethrough)}"`
        : ''
    }>${text}</del>`
  }

  customRenderer.em = (text) => {
    return `<em${
      parseCssInJsToInlineCss(finalStyles.italic) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.italic)}"`
        : ''
    }>${text}</em>`
  }

  customRenderer.heading = (text, level) => {
    return `<h${level}${
      parseCssInJsToInlineCss(
        finalStyles[`h${level}` as keyof StylesType],
      ) !== ''
        ? ` style="${parseCssInJsToInlineCss(
          finalStyles[`h${level}` as keyof StylesType],
        )}"`
        : ''
    }>${text}</h${level}>`
  }

  customRenderer.hr = () => {
    return `<hr${
      parseCssInJsToInlineCss(finalStyles.hr) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.hr)}"`
        : ''
    } />\n`
  }

  customRenderer.image = (href, _, text) => {
    return `<img src="${href}" alt="${text}"${
      parseCssInJsToInlineCss(finalStyles.image) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.image)}"`
        : ''
    }>`
  }

  customRenderer.link = (href, _, text) => {
    return `<a href="${href}" target="_blank"${
      parseCssInJsToInlineCss(finalStyles.link) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.link)}"`
        : ''
    }>${text}</a>`
  }

  customRenderer.list = (body, ordered, start) => {
    const type = ordered ? 'ol' : 'ul'
    const startatt = ordered && start !== 1 ? ' start="' + start + '"' : ''
    const styles = parseCssInJsToInlineCss(
      finalStyles[ordered ? 'ol' : 'ul'],
    )
    return (
      '<'
      + type
      + startatt
      + `${styles !== '' ? ` style="${styles}"` : ''}>\n`
      + body
      + '</'
      + type
      + '>\n'
    )
  }

  customRenderer.listitem = (text) => {
    return `<li${
      parseCssInJsToInlineCss(finalStyles.li) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.li)}"`
        : ''
    }>${text}</li>\n`
  }

  customRenderer.paragraph = (text) => {
    return `<p${
      parseCssInJsToInlineCss(finalStyles.p) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.p)}"`
        : ''
    }>${text}</p>\n`
  }

  customRenderer.strong = (text) => {
    return `<strong${
      parseCssInJsToInlineCss(finalStyles.bold) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.bold)}"`
        : ''
    }>${text}</strong>`
  }

  customRenderer.table = (header, body) => {
    if (body) body = `<tbody>${body}</tbody>`

    return `<table${
      parseCssInJsToInlineCss(finalStyles.table) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.table)}"`
        : ''
    }>\n<thead${
      parseCssInJsToInlineCss(finalStyles.thead) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.thead)}"`
        : ''
    }>\n${header}</thead>\n${body}</table>\n`
  }

  customRenderer.tablecell = (content, flags) => {
    const type = flags.header ? 'th' : 'td'
    const tag = flags.align
      ? `<${type} align="${flags.align}"${
        parseCssInJsToInlineCss(finalStyles.td) !== ''
          ? ` style="${parseCssInJsToInlineCss(finalStyles.td)}"`
          : ''
      }>`
      : `<${type}${
        parseCssInJsToInlineCss(finalStyles.td) !== ''
          ? ` style="${parseCssInJsToInlineCss(finalStyles.td)}"`
          : ''
      }>`
    return tag + content + `</${type}>\n`
  }

  customRenderer.tablerow = (content) => {
    return `<tr${
      parseCssInJsToInlineCss(finalStyles.tr) !== ''
        ? ` style="${parseCssInJsToInlineCss(finalStyles.tr)}"`
        : ''
    }>\n${content}</tr>\n`
  }

  return customRenderer
}
