import { defineEventHandler, readValidatedBody, createError } from 'h3'
import { renderEmailComponent } from '../../utils/render'
import z from 'zod'
import type { HtmlToTextOptions } from 'html-to-text'
import { useNitroApp } from 'nitropack/runtime'
import type { DevtoolsPreviewPropsContext } from '../../../../runtime/types'

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
    const cleanTemplateName = templateName.endsWith('.vue')
      ? templateName.replace('.vue', '')
      : templateName

    const previewPropsContext: DevtoolsPreviewPropsContext = {
      templateName: cleanTemplateName,
      props: props ? { ...props } : {},
    }

    await useNitroApp().hooks.callHook(
      'nuxt-email-renderer:devtools:resolveProps',
      previewPropsContext,
    )

    if (isInvalidProps(previewPropsContext.props)) {
      throw createError({
        statusCode: 500,
        statusMessage: '[nuxt-email-renderer] Invalid props returned by "nuxt-email-renderer:devtools:resolveProps" hook. Expected a plain object.',
      })
    }

    return renderEmailComponent(templateName, previewPropsContext.props, {
      pretty,
      plainText,
      htmlToTextOptions,
      locale,
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

function isInvalidProps(value: unknown): value is null | undefined | unknown[] {
  return (
    value === null
    || value === undefined
    || Array.isArray(value)
    || typeof value !== 'object'
  )
}
