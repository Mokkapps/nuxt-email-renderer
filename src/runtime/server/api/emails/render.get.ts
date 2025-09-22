import { useStorage } from '#imports'
import { defineEventHandler, getQuery, createError } from 'h3'
import { render } from '../../utils/render'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const emailName = query.name as string

  if (!emailName) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email name is required. Use ?name=EmailName',
    })
  }

  try {
    // Check if the email template exists in server assets
    const filename = emailName.endsWith('.vue') ? emailName : `${emailName}.vue`

    const storage = useStorage('assets:emails')
    const source = await storage.getItem(filename)

    if (!source) {
      throw createError({
        statusCode: 404,
        statusMessage: `Email template "${emailName}" not found`,
      })
    }

    // Create a simple template component from the source
    // This approach compiles the template at runtime using Vue's template compiler
    const templateMatch = (source as string).match(/<template[^>]*>([\s\S]*?)<\/template>/i)

    if (!templateMatch) {
      throw createError({
        statusCode: 500,
        statusMessage: `Email template "${emailName}" has no template block`,
      })
    }

    const templateContent = templateMatch[1].trim()

    // Create a simple component object
    const component = {
      template: templateContent,
      setup() {
        // Basic setup function
        return {}
      },
    }

    // Render the email component
    return await render(component)
  }
  catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: `Failed to render email: ${error.message || 'Unknown error'}`,
    })
  }
})
