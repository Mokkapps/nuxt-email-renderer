import { renderToString } from 'vue/server-renderer'
import { createError } from 'h3'
import type { AllowedComponentProps, Component, VNodeProps } from 'vue'
import { createSSRApp } from 'vue'
import type { Options } from './options'
import { convert } from 'html-to-text'
import { pretty } from './pretty'
import { plainTextSelectors } from './plainTextSelectors'
import { cleanup } from './cleanup'
import { promises as fs } from 'node:fs'
import { resolve as resolvePath, join } from 'node:path'

import { emailComponents } from '../../components'

async function registerEmailComponents(app: ReturnType<typeof createSSRApp>) {
  // Register all email components automatically
  for (const [name, componentImporter] of Object.entries(emailComponents)) {
    const component = await componentImporter()
    app.component(name, component.default)
  }
}

async function loadLocaleMessages(localesDir: string): Promise<Record<string, any>> {
  const messages: Record<string, any> = {}
  
  try {
    const files = await fs.readdir(localesDir)
    
    for (const file of files) {
      // Support .json, .js, .ts, .mjs files
      if (!/\.(json|m?js|ts)$/.test(file)) continue
      
      const locale = file.replace(/\.(json|m?js|ts)$/, '')
      const filePath = resolvePath(localesDir, file)
      
      if (file.endsWith('.json')) {
        const content = await fs.readFile(filePath, 'utf-8')
        messages[locale] = JSON.parse(content)
      }
      else {
        // Dynamic import for JS/TS files
        const content = await import(filePath)
        messages[locale] = content.default || content
      }
    }
  }
  catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to load locale messages from "${localesDir}": ${error.message}`,
    })
  }
  
  return messages
}

export type ExtractComponentProps<TComponent>
  = TComponent extends new () => {
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
  options?: Options,
) {
  const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
  const App = createSSRApp(component, props || {})

  await registerEmailComponents(App)

  // Setup i18n support if enabled
  if (options?.i18n?.enabled) {
    try {
      // Define Vue global variables for SSR compatibility with vue-i18n
      // These need to be set before importing vue-i18n
      if (typeof globalThis !== 'undefined' && !(globalThis as any).__VUE_PROD_DEVTOOLS__) {
        (globalThis as any).__VUE_PROD_DEVTOOLS__ = () => false
        (globalThis as any).__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false
      }
      
      const { createI18n } = await import('vue-i18n')
      
      let i18n
      
      if (options.i18n.useAppInstance && options.i18n.appInstance) {
        // Use existing i18n instance from the app
        i18n = options.i18n.appInstance
      }
      else {
        // Create a new i18n instance
        let messages = options.i18n.messages || {}
        
        // Load messages from localesDir if provided and no messages given
        if (!options.i18n.messages && options.i18n.localesDir) {
          messages = await loadLocaleMessages(options.i18n.localesDir)
        }
        
        i18n = createI18n({
          legacy: true, // Use legacy mode for global $t function in templates
          locale: options.i18n.locale || options.i18n.defaultLocale || 'en',
          fallbackLocale: options.i18n.defaultLocale || 'en',
          messages,
          globalInjection: true, // Enable global $t function
          missingWarn: false, // Disable missing translation warnings in production
          fallbackWarn: false, // Disable fallback warnings in production
        })
      }
      
      App.use(i18n)
    }
    catch (error: any) {
      // If vue-i18n is not installed, throw a helpful error
      if (error.code === 'ERR_MODULE_NOT_FOUND' || error.code === 'MODULE_NOT_FOUND') {
        throw createError({
          statusCode: 500,
          statusMessage: 'vue-i18n is required for i18n support. Please install it: npm install vue-i18n',
        })
      }
      throw error
    }
  }

  const markup = await renderToString(App)
  if (options?.plainText) {
    return convert(markup, {
      selectors: plainTextSelectors,
      ...(options?.plainText === true ? options.htmlToTextOptions : {}),
    })
  }

  const doc = `${doctype}${cleanup(markup)}`

  if (options && options.pretty) {
    return pretty(doc)
  }

  return doc
}

export async function renderEmailComponent<T extends Component>(componentName: string, props?: ExtractComponentProps<T>,
  options?: Options) {
  const cleanComponentName = componentName.endsWith('.vue')
    ? componentName.replace('.vue', '')
    : componentName

  const { getEmailTemplate, hasEmailTemplate } = await import('./template-resolver')

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
