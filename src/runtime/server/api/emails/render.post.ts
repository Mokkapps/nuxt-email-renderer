import { defineEventHandler, readValidatedBody, createError } from 'h3'
import { renderEmailComponent } from '../../utils/render'
import z from 'zod'
import type { HtmlToTextOptions } from 'html-to-text'

const bodySchema = z.object({
  name: z.string().nonempty(),
  pretty: z.boolean().optional(),
  plainText: z.boolean().optional(),
  props: z.custom<Record<string, any>>().optional(),
  htmlToTextOptions: z.custom<HtmlToTextOptions>().optional(),
  locale: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const {
    name: templateName,
    pretty,
    plainText,
    props,
    htmlToTextOptions,
    locale,
  } = await readValidatedBody(event, bodySchema.parse)

  try {
    return renderEmailComponent(templateName, props, {
      pretty,
      plainText,
      htmlToTextOptions,
      locale,
      event,
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
