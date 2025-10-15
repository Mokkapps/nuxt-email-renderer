import z from 'zod'
import { defineEventHandler, readValidatedBody } from 'h3'
import { renderEmailComponent } from '#imports'

const bodySchema = z.object({
  name: z.string().min(1),
  locale: z.string().optional(),
  props: z.custom<Record<string, any>>().optional(),
})

export default defineEventHandler(async (event) => {
  const { name, locale, props } = await readValidatedBody(
    event,
    bodySchema.parse,
  )

  return renderEmailComponent(name, props, { locale, event })
})
