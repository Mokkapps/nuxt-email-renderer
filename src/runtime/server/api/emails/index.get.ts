import { defineEventHandler } from 'h3'
import { getAllEmailTemplates } from '../../utils/template-resolver'
import type { EmailTemplate } from '../../../../runtime/types'
import { consola } from 'consola'

export default defineEventHandler(async () => {
  try {
    const templates = await getAllEmailTemplates()

    // Transform to match the expected API format
    const mappedTemplates: Array<EmailTemplate> = templates.map(template => ({
      name: template.name,
      filename: template.filename,
      displayName: template.displayName,
    }))
    return mappedTemplates
  }
  catch (error: any) {
    consola.error('[nuxt-email-renderer] Failed to get email templates:', error)
    // Return empty array instead of error object to prevent prerender failures
    // This allows the consuming app to build successfully even if no email templates exist
    return []
  }
})
