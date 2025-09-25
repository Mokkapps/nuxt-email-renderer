import { defineEventHandler } from 'h3'
// @ts-expect-error no idea why this is necessary
import { useStorage } from '#imports'

interface EmailTemplate {
  name: string
  filename: string
  displayName: string
}

export default defineEventHandler(async () => {
  try {
    const storage = useStorage('assets:emails')
    const files = await storage.getKeys()

    // Filter only .vue files and clean up the names
    const emailTemplates = files
      .map((file: any) => typeof file === 'string' ? file : Buffer.from(file).toString('utf8'))
      .filter((file: string) => file.endsWith('.vue'))
      .map((file: string) => ({
        name: file.replace('.vue', ''),
        filename: file,
        displayName: file
          .replace('.vue', '')
          .replace(/([A-Z])/g, ' $1')
          .trim(),
      }))
      .sort((a: EmailTemplate, b: EmailTemplate) => a.displayName.localeCompare(b.displayName))

    return emailTemplates
  }
  catch (error: any) {
    return {
      error: true,
      message: error.message || 'Failed to fetch email templates',
    }
  }
})
