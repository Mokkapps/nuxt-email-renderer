import { defineEventHandler, readValidatedBody, createError } from 'h3'
import { renderEmailComponent } from '../../utils/render'
import z from 'zod'
import type { HtmlToTextOptions } from 'html-to-text'

const i18nSchema = z.object({
  enabled: z.boolean(),
  locale: z.string().optional(),
  defaultLocale: z.string().optional(),
  useAppInstance: z.boolean().optional(),
  appInstance: z.any().optional(),
  localesDir: z.string().optional(),
  messages: z.record(z.string(), z.any()).optional(),
}).optional()

const bodySchema = z.object({
  name: z.string().nonempty(),
  pretty: z.boolean().optional(),
  plainText: z.boolean().optional(),
  props: z.custom<Record<string, any>>().optional(),
  htmlToTextOptions: z.custom<HtmlToTextOptions>().optional(),
  i18n: i18nSchema,
})

export default defineEventHandler(async (event) => {
  const {
    name: templateName,
    pretty,
    plainText,
    props,
    htmlToTextOptions,
    i18n,
  } = await readValidatedBody(event, bodySchema.parse)

  try {
    return renderEmailComponent(templateName, props, {
      pretty,
      plainText,
      htmlToTextOptions,
      i18n,
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
