import { renderToString } from 'vue/server-renderer'
import { createError } from 'h3'
import type { AllowedComponentProps, Component, VNodeProps } from 'vue'
import { createSSRApp } from 'vue'
import type { Options } from './options'
import { convert } from 'html-to-text'
import { pretty } from './pretty'
import { plainTextSelectors } from './plainTextSelectors'
import { cleanup } from './cleanup'

import { emailComponents } from '../../components'

async function registerEmailComponents(app: ReturnType<typeof createSSRApp>) {
  // Register all email components automatically
  for (const [name, componentImporter] of Object.entries(emailComponents)) {
    const component = await componentImporter()
    app.component(name, component.default)
  }
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

  try {
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
  catch (error: any) {
    // Re-throw H3 errors as-is
    if (error.statusCode) {
      throw error
    }

    // Handle any other errors gracefully
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to render email template: ${error.message || 'Unknown error'}`,
    })
  }
}
