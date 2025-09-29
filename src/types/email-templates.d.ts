declare module '#email-templates' {
  import type { Component } from 'vue'
  import type { EmailTemplateInfo } from '../runtime/types'

  export const emailTemplates: Record<string, Component>
  export const emailTemplateMapping: Record<string, EmailTemplateInfo>
  export function getEmailTemplate(name: string): Component | undefined
}

// Re-export types for global availability
export type { EmailTemplate, EmailTemplateInfo, EmailTemplateMapping } from '../runtime/types'
