import { defineEventHandler } from 'h3'
import { getAllEmailTemplates } from '../../utils/template-resolver'

export default defineEventHandler(async () => {
  try {
    const templates = await getAllEmailTemplates()

    // Transform to match the expected API format
    return templates.map(template => ({
      name: template.name,
      filename: template.filename,
      displayName: template.displayName,
    }))
  }
  catch (error: any) {
    return {
      error: true,
      message: error.message || 'Failed to fetch email templates',
    }
  }
})
