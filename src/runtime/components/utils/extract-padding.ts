import type { CSSProperties } from 'vue'

const PADDING_KEYS = new Set([
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
])

/**
 * Splits a CSS style object into padding-related and non-padding properties.
 *
 * This is used to apply padding to `td` elements instead of `table` elements,
 * which ensures padding works correctly in email clients that apply
 * `table { border-collapse: collapse }` (e.g. OX Software webmail).
 *
 * Returns `undefined` for either result when the corresponding object would be empty,
 * so that no empty `style` attributes are rendered.
 */
export function extractPaddingFromStyle(style?: CSSProperties): {
  paddingStyle: CSSProperties | undefined
  remainingStyle: CSSProperties | undefined
} {
  if (!style) {
    return { paddingStyle: undefined, remainingStyle: undefined }
  }

  const paddingStyle: CSSProperties = {}
  const remainingStyle: CSSProperties = {}

  for (const [key, value] of Object.entries(style)) {
    if (PADDING_KEYS.has(key)) {
      ;(paddingStyle as Record<string, unknown>)[key] = value
    }
    else {
      ;(remainingStyle as Record<string, unknown>)[key] = value
    }
  }

  return {
    paddingStyle: Object.keys(paddingStyle).length > 0 ? paddingStyle : undefined,
    remainingStyle: Object.keys(remainingStyle).length > 0 ? remainingStyle : undefined,
  }
}
