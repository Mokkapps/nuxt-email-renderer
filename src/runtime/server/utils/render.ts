import { renderToString } from 'vue/server-renderer'
import type { AllowedComponentProps, Component, VNodeProps } from 'vue'
import { createSSRApp } from 'vue'
import { convert } from 'html-to-text'
import type { Options } from './options'
import { pretty } from './pretty'
import { plainTextSelectors } from './plainTextSelectors'
import { cleanup } from './cleanup'
import { SUBJECT_INJECTION_KEY } from '../../components/subject/ESubject.vue'

const DOCTYPE = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'

export type RenderOptions = Options & {
  /**
   * The locale to use for rendering the email template.
   * Only applies if @nuxtjs/i18n is installed.
   */
  locale?: string
}

/** Project-wide settings `renderEmailComponent` reads from the server config. */
export interface RenderContext {
  /** Components registered globally, such as the built-in `E*` components. */
  components?: Record<string, Component>
  /** CSS injected into the `<head>` of every email. */
  globalCss?: string
  i18n?: {
    defaultLocale: string
    messages: Record<string, unknown>
  }
}

export type ExtractComponentProps<TComponent> = TComponent extends new () => {
  $props: infer P
}
  ? Omit<P, keyof VNodeProps | keyof AllowedComponentProps>
  : never

async function installI18n(app: ReturnType<typeof createSSRApp>, i18n: NonNullable<RenderContext['i18n']>, locale?: string) {
  let createI18n: (typeof import('vue-i18n'))['createI18n']
  try {
    ({ createI18n } = await import('vue-i18n'))
  }
  catch {
    throw new Error('[nuxt-email-renderer] vue-i18n is required for email template translations '
      + 'but could not be imported. Add "vue-i18n" as a dependency of your project.')
  }
  app.use(createI18n({
    legacy: false,
    locale: locale || i18n.defaultLocale,
    fallbackLocale: i18n.defaultLocale,
    messages: i18n.messages,
  }))
}

/** Render a Vue component to email HTML. */
export async function render<T extends Component>(
  component: T,
  props?: ExtractComponentProps<T>,
  options?: RenderOptions,
  context: RenderContext = {},
) {
  let capturedSubject: string | undefined
  const app = createSSRApp(component, props || {})
  app.provide(SUBJECT_INJECTION_KEY, (subject: string) => {
    capturedSubject = subject
  })
  for (const [name, registered] of Object.entries(context.components ?? {})) {
    app.component(name, registered)
  }
  if (context.i18n) {
    await installI18n(app, context.i18n, options?.locale)
  }

  const markup = await renderToString(app)
  const subject = capturedSubject ? decodeHtmlEntities(capturedSubject) : undefined

  if (options?.plainText) {
    const plainText = convert(markup, {
      selectors: plainTextSelectors,
      ...options.htmlToTextOptions,
    })
    return subject ? { html: plainText, subject } : plainText
  }

  let doc = `${DOCTYPE}${cleanup(markup)}`
  // The CSS comes from files the developer listed in nuxt.config, so it is trusted.
  if (context.globalCss) {
    doc = doc.replace(/(<\/head>)/i, `<style data-id="__nuxt-email-global-style">${context.globalCss}</style>$1`)
  }
  const html = options?.pretty ? pretty(doc) : doc

  return subject ? { html, subject } : html
}

const HTML_ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': '\'',
  '&apos;': '\'',
}

function decodeHtmlEntities(text: string): string {
  return text.replace(/&[a-z]+;|&#\d+;/gi, match => HTML_ENTITIES[match] || match)
}
