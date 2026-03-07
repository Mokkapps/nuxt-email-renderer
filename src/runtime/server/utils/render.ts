import { renderToString } from 'vue/server-renderer'
import { createError, type H3Event } from 'h3'
import type { AllowedComponentProps, Component, VNodeProps } from 'vue'
import { createSSRApp } from 'vue'
import type { Options } from './options'
import { convert } from 'html-to-text'
import { pretty } from './pretty'
import { plainTextSelectors } from './plainTextSelectors'
import { cleanup } from './cleanup'

import { emailComponents } from '../../components'
import { SUBJECT_INJECTION_KEY } from '../../components/subject/ESubject.vue'

async function registerEmailComponents(app: ReturnType<typeof createSSRApp>) {
  for (const [name, componentImporter] of Object.entries(emailComponents)) {
    const component = await componentImporter()
    app.component(name, component.default)
  }
}

async function setupI18n(
  app: ReturnType<typeof createSSRApp>,
  locale?: string,
  event?: H3Event,
) {
  try {
    if (event) {
      const ok = await setupI18nFromEvent(app, event, locale)
      if (ok) {
        return true
      }
    }
    return await setupI18nFromRuntimeConfig(app, locale)
  }
  catch (error) {
    console.warn('[nuxt-email-renderer] Failed to setup i18n:', error)
    return false
  }
}

/**
 * Install a minimal $t plugin on the Vue app using raw messages.
 * This is used as a fallback when vue-i18n is not available.
 * Supports named interpolation ({name}) but not positional (array) params.
 */
function installFallbackI18nPlugin(
  app: ReturnType<typeof createSSRApp>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messages: Record<string, any>,
  locale: string,
  fallbackLocale: string,
) {
  const t = (key: string, params?: Record<string, unknown> | unknown[]) => {
    const localeMessages
      = (messages[locale] || messages[fallbackLocale] || {}) as Record<
        string,
        string
      >
    const message = (localeMessages[key] ?? key) as string
    if (!params) return message
    // Named params only; array-style positional params are not supported in
    // this lightweight fallback (they require the full vue-i18n runtime).
    const namedParams = Array.isArray(params) ? {} : (params as Record<string, unknown>)
    return message.replace(
      /\{(\w+)\}/g,
      (_, k) => String(namedParams[k] ?? `{${k}}`),
    )
  }
  app.config.globalProperties.$t = t
}

/**
 * Try to install vue-i18n on the app. Returns true on success.
 * Falls back to a minimal translation plugin if vue-i18n is unavailable.
 */
async function installI18nPlugin(
  app: ReturnType<typeof createSSRApp>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messages: Record<string, any>,
  locale: string,
  fallbackLocale: string,
): Promise<boolean> {
  try {
    const { createI18n } = await import('vue-i18n')
    const i18n = createI18n({
      legacy: false,
      locale,
      messages,
      fallbackLocale,
    })
    app.use(i18n)
    return true
  }
  catch {
    // vue-i18n not available – install a minimal fallback plugin so $t is
    // always a function in email templates.
    installFallbackI18nPlugin(app, messages, locale, fallbackLocale)
    return true
  }
}

// Attempt to extract i18n configuration from the H3 event context.
// Supports both @nuxtjs/i18n v10 (event.context.nuxtI18n) and legacy setups
// (event.context.i18n / event.context.$i18n).
async function setupI18nFromEvent(
  app: ReturnType<typeof createSSRApp>,
  event: H3Event,
  locale?: string,
): Promise<boolean> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const eventContext = event.context as Record<string, any>

    // @nuxtjs/i18n v10 stores its context under event.context.nuxtI18n.
    // However, messages there may be empty placeholders when locale files are
    // used (they are loaded lazily). Only proceed when messages are populated;
    // otherwise fall through to the runtimeConfig path which has messages
    // loaded at build time.
    const nuxtI18nCtx = eventContext.nuxtI18n
    if (nuxtI18nCtx?.vueI18nOptions) {
      const vueI18nOptions = nuxtI18nCtx.vueI18nOptions
      const messages = (vueI18nOptions.messages || {}) as Record<string, unknown>
      const defaultLocale = (vueI18nOptions.defaultLocale || vueI18nOptions.locale || 'en') as string
      const resolvedLocale = locale || defaultLocale

      // Only use the event context messages when they contain actual translations
      // for the requested (or default) locale.
      const localeMsg = (messages[resolvedLocale] || messages[defaultLocale] || {}) as Record<string, unknown>
      if (Object.keys(localeMsg).length > 0) {
        return await installI18nPlugin(app, messages, resolvedLocale, defaultLocale)
      }
      // Empty messages – fall through to runtimeConfig below
      return false
    }

    // Legacy: some setups expose the i18n instance directly on the event context
    const i18nInstance = eventContext.i18n || eventContext.$i18n
    if (!i18nInstance) {
      return false
    }

    const messages = (i18nInstance.messages || {}) as Record<string, unknown>
    const instanceLocale = (i18nInstance.locale || i18nInstance.defaultLocale || 'en') as string
    return await installI18nPlugin(app, messages, locale || instanceLocale, instanceLocale)
  }
  catch {
    return false
  }
}

async function setupI18nFromRuntimeConfig(
  app: ReturnType<typeof createSSRApp>,
  locale?: string,
): Promise<boolean> {
  try {
    const { useRuntimeConfig } = await import('nitropack/runtime')
    const config = useRuntimeConfig()

    if (!config.public?.i18n) {
      return false
    }

    const i18nConfig = config.public.i18n as Record<string, unknown>

    // Get messages from runtime config (loaded during module setup)
    const messages = (i18nConfig.messages || {}) as Record<string, unknown>
    const defaultLocale = (i18nConfig.defaultLocale
      || i18nConfig.locale
      || 'en') as string

    return await installI18nPlugin(app, messages, locale || defaultLocale, defaultLocale)
  }
  catch {
    return false
  }
}

export type RenderOptions = Options & {
  /**
   * The locale to use for rendering the email template.
   * Only applies if @nuxtjs/i18n is installed.
   */
  locale?: string
  /**
   * The H3 event context, used to extract i18n configuration.
   * @internal
   */
  event?: H3Event
}

export type ExtractComponentProps<TComponent> = TComponent extends new () => {
  $props: infer P
}
  ? Omit<P, keyof VNodeProps | keyof AllowedComponentProps>
  : never

export interface VNode {
  type: string
  props: {
    style?: Record<string, string | number>
    children?: string | VNode | VNode[]
    [prop: string]: unknown
  }
}

export async function render<T extends Component>(
  component: T,
  props?: ExtractComponentProps<T>,
  options?: RenderOptions,
) {
  const doctype
    = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'

  // Capture subject from ESubject component
  let capturedSubject: string | undefined

  const App = createSSRApp(component, props || {})

  // Provide subject setter
  App.provide(SUBJECT_INJECTION_KEY, (subject: string) => {
    capturedSubject = subject
  })

  await registerEmailComponents(App)

  // Always try to setup i18n to support $t() in email templates when i18n is configured
  await setupI18n(App, options?.locale, options?.event)

  const markup = await renderToString(App)

  // Decode HTML entities in subject
  const decodedSubject = capturedSubject
    ? decodeHtmlEntities(capturedSubject)
    : undefined

  if (options?.plainText) {
    const plainText = convert(markup, {
      selectors: plainTextSelectors,
      ...(options?.plainText === true ? options.htmlToTextOptions : {}),
    })
    return decodedSubject ? { html: plainText, subject: decodedSubject } : plainText
  }

  const doc = `${doctype}${cleanup(markup)}`

  const html = options && options.pretty ? pretty(doc) : doc

  return decodedSubject ? { html, subject: decodedSubject } : html
}

// Helper function to decode HTML entities
function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': '\'',
    '&apos;': '\'',
  }

  return text.replace(/&[a-z]+;|&#\d+;/gi, (match) => {
    return entities[match] || match
  })
}

export async function renderEmailComponent<T extends Component>(
  componentName: string,
  props?: ExtractComponentProps<T>,
  options?: RenderOptions,
) {
  const cleanComponentName = componentName.endsWith('.vue')
    ? componentName.replace('.vue', '')
    : componentName

  const { getEmailTemplate, hasEmailTemplate } = await import(
    './template-resolver'
  )

  if (!(await hasEmailTemplate(cleanComponentName))) {
    throw createError({
      statusCode: 404,
      statusMessage: `Email template "${componentName}" not found`,
    })
  }

  const component = await getEmailTemplate(cleanComponentName)

  if (!component) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to load email template "${componentName}"`,
    })
  }

  return render(component, props, options)
}
