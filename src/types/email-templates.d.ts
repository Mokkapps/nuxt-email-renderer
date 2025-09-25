declare module '#email-templates' {
  import type { Component } from 'vue'
  import type { EmailTemplateInfo } from './src/runtime/server/utils/virtual-templates'

  export const emailTemplates: Record<string, Component>
  export const emailTemplateMapping: Record<string, EmailTemplateInfo>
  export function getEmailTemplate(name: string): Component | undefined
}
