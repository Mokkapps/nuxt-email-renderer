import type { Component } from 'vue'
import { createError } from 'h3'
import { useRuntimeConfig } from 'nitropack/runtime'
import { emailComponents } from '#email-components'
import { emailTemplateInfos, emailTemplates } from '#email-templates'
import type { EmailTemplateInfo } from '../../types'
import { render } from './render'
import type { ExtractComponentProps, RenderContext, RenderOptions } from './render'

/** Accept `Welcome` as well as `Welcome.vue`. */
function templateName(name: string) {
  return name.replace(/\.vue$/, '')
}

export function getEmailTemplateInfo(name: string): EmailTemplateInfo | undefined {
  return emailTemplateInfos[templateName(name)]
}

export function getEmailTemplateInfos(): EmailTemplateInfo[] {
  return Object.values(emailTemplateInfos)
}

/** Render an email template from the emails directory by name. */
export async function renderEmailComponent<T extends Component>(
  name: string,
  props?: ExtractComponentProps<T>,
  options?: RenderOptions,
) {
  const component = emailTemplates[templateName(name)]
  if (!component) {
    throw createError({
      statusCode: 404,
      statusMessage: `Email template "${name}" not found`,
    })
  }

  const config = useRuntimeConfig().nuxtEmailRenderer as Pick<RenderContext, 'globalCss' | 'i18n'> | undefined
  return render(component, props, options, {
    components: emailComponents,
    globalCss: config?.globalCss,
    i18n: config?.i18n,
  })
}
