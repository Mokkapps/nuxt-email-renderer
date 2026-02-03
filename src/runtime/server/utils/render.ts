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
    if (event && setupI18nFromEvent) {
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

// Simplified event context approach
async function setupI18nFromEvent(
  app: ReturnType<typeof createSSRApp>,
  event: H3Event,
  locale?: string,
): Promise<boolean> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const eventContext = event.context as Record<string, any>
    const i18nInstance = eventContext.i18n || eventContext.$i18n
    if (!i18nInstance) {
      return false
    }

    const { createI18n } = await import('vue-i18n')
    const messages = i18nInstance.messages || {}
    const instanceLocale
      = i18nInstance.locale || i18nInstance.defaultLocale || 'en'
    const i18n = createI18n({
      legacy: false,
      locale: locale || instanceLocale,
      messages,
      ...(i18nInstance.options || {}),
    })
    app.use(i18n)
    return true
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

    const { createI18n } = await import('vue-i18n')
    const i18nConfig = config.public.i18n as Record<string, unknown>

    // Get messages from runtime config (loaded during module setup)
    const messages = (i18nConfig.messages || {}) as Record<string, unknown>
    const defaultLocale = (i18nConfig.defaultLocale
      || i18nConfig.locale
      || 'en') as string

    const i18n = createI18n({
      legacy: false,
      locale: locale || defaultLocale,
      messages: messages as never,
      fallbackLocale: defaultLocale,
    })

    app.use(i18n)
    return true
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

  // Setup i18n if locale or event is provided
  if (options?.locale || options?.event) {
    await setupI18n(App, options.locale, options.event)
  }

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
    '&#39;': "'",
    '&apos;': "'",
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
