import { defineEventHandler } from 'h3'
import { useStorage } from '#imports'

export default defineEventHandler(async () => {
  try {
    // Get all email templates from server assets
    const storage = useStorage('assets:emails')
    const files = await storage.getKeys()

    // Filter only .vue files and clean up the names
    const emailTemplates = files
      .filter(file => file.endsWith('.vue'))
      .map(file => ({
        name: file.replace('.vue', ''),
        filename: file,
        displayName: file.replace('.vue', '').replace(/([A-Z])/g, ' $1').trim()
      }))
      .sort((a, b) => a.displayName.localeCompare(b.displayName))

    return emailTemplates
  } catch (error: any) {
    return {
      error: true,
      message: error.message || 'Failed to fetch email templates'
    }
  }
})
