declare module 'nuxt-email-renderer' {
  import type { EmailTemplate, EmailTemplateInfo, EmailTemplateMapping } from './src/runtime/types'

  export { EmailTemplate, EmailTemplateInfo, EmailTemplateMapping }
}

// Global type augmentation for Nuxt
declare module '#app' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface NuxtApp {
    // Add any app-level types here if needed
  }
}

// Make types available globally via auto-import
declare global {
  type EmailTemplate = import('./src/runtime/types').EmailTemplate
  type EmailTemplateInfo = import('./src/runtime/types').EmailTemplateInfo
  type EmailTemplateMapping = import('./src/runtime/types').EmailTemplateMapping
}

export {}
