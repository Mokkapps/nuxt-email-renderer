import { defineEventHandler, readValidatedBody, createError } from 'h3'
// @ts-expect-error no idea why this is necessary
import { useStorage } from '#imports'
import { render } from '../../utils/render'
import z from 'zod'
import type { HtmlToTextOptions } from 'html-to-text'

const bodySchema = z.object({
  name: z.string().nonempty(),
  pretty: z.boolean().optional(),
  plainText: z.boolean().optional(),
  props: z.custom<Record<string, any>>().optional(),
  htmlToTextOptions: z.custom<HtmlToTextOptions>().optional(),
})

export default defineEventHandler(async (event) => {
  const { name: templateName, pretty, plainText, props, htmlToTextOptions } = await readValidatedBody(event, bodySchema.parse)

  try {
    // Check if the email template exists in server assets
    const filename = templateName.endsWith('.vue') ? templateName : `${templateName}.vue`

    const storage = useStorage('assets:emails')
    let source = await storage.getItem(filename)

    console.log('Email source:', source)

    if (!source) {
      throw createError({
        statusCode: 404,
        statusMessage: `Email template "${templateName}" not found`,
      })
    }

    if (typeof source !== 'string') {
      source = Buffer.from(source).toString('utf8')
    }

    // Create a simple template component from the source
    // This approach compiles the template at runtime using Vue's template compiler
    const templateMatch = source.match(/<template[^>]*>([\s\S]*?)<\/template>/i)

    if (!templateMatch) {
      throw createError({
        statusCode: 500,
        statusMessage: `Email template "${templateName}" has no template block`,
      })
    }

    const templateContent = templateMatch[1]?.trim()

    // Create a simple component object
    const component = {
      template: templateContent,
      setup() {
        return {}
      },
    }

    return await render(component, props as any, { pretty, plainText, htmlToTextOptions })
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
