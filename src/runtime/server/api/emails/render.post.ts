import { defineEventHandler, readValidatedBody, createError } from 'h3'
import { render } from '../../utils/render'
import {
  getEmailTemplate,
  hasEmailTemplate,
} from '../../utils/template-resolver'
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
  const {
    name: templateName,
    pretty,
    plainText,
    props,
    htmlToTextOptions,
  } = await readValidatedBody(event, bodySchema.parse)

  try {
    // Clean template name (remove .vue extension if present)
    const cleanTemplateName = templateName.endsWith('.vue')
      ? templateName.replace('.vue', '')
      : templateName

    // Check if template exists
    if (!(await hasEmailTemplate(cleanTemplateName))) {
      throw createError({
        statusCode: 404,
        statusMessage: `Email template "${templateName}" not found`,
      })
    }

    // Get the fully compiled Vue component
    const component = await getEmailTemplate(cleanTemplateName)

    if (!component) {
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to load email template "${templateName}"`,
      })
    }

    // Render the component with full SFC support
    return await render(component, props as any, {
      pretty,
      plainText,
      htmlToTextOptions,
    })
  }
  catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: `Failed to render email: ${
        error.message || 'Unknown error'
      }`,
    })
  }
})
