import type { HtmlToTextOptions } from 'html-to-text'

export interface I18nRenderOptions {
  /**
   * Enable i18n for this specific render
   */
  enabled: boolean
  /**
   * The locale to use for this render
   */
  locale?: string
  /**
   * Default/fallback locale
   */
  defaultLocale?: string
  /**
   * Use an existing i18n instance from the app
   */
  useAppInstance?: boolean
  /**
   * The existing i18n instance (if useAppInstance is true)
   */
  appInstance?: any
  /**
   * Directory containing locale message files
   */
  localesDir?: string
  /**
   * Pre-loaded locale messages (alternative to localesDir)
   */
  messages?: Record<string, any>
}

export type Options = {
  pretty?: boolean
  /**
   * i18n configuration for this render
   */
  i18n?: I18nRenderOptions
} & (
  | {
    plainText?: false
  }
  | {
    plainText?: true
    /**
     * These are options you can pass down directly to the library we use for
     * converting the rendered email's HTML into plain text.
     *
     * @see https://github.com/html-to-text/node-html-to-text
     */
    htmlToTextOptions?: HtmlToTextOptions
  }
  )
