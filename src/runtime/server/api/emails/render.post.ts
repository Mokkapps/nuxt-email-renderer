import { createError, defineEventHandler, readValidatedBody, useServerHooks } from 'nuxt/server'
import type { HtmlToTextOptions } from 'html-to-text'
import z from 'zod'
import type { DevtoolsPreviewPropsContext } from '../../../types'
import { renderEmailComponent } from '../../utils/email'

const bodySchema = z.object({
  name: z.string().nonempty(),
  pretty: z.boolean().optional(),
  plainText: z.boolean().optional(),
  props: z.record(z.string(), z.unknown()).optional(),
  htmlToTextOptions: z.custom<HtmlToTextOptions>().optional(),
  locale: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const { name, props, ...options } = await readValidatedBody(event, bodySchema)

  const context: DevtoolsPreviewPropsContext = {
    templateName: name.replace(/\.vue$/, ''),
    props: { ...props },
  }
  await useServerHooks().callHook('nuxt-email-renderer:devtools:resolveProps', context)

  if (!isPlainObject(context.props)) {
    throw createError({
      status: 500,
      statusText: '[nuxt-email-renderer] Invalid props returned by "nuxt-email-renderer:devtools:resolveProps" hook. Expected a plain object.',
    })
  }

  return renderEmailComponent(name, context.props, options)
})

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object') return false
  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}
