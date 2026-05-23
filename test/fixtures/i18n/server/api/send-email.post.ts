import z from 'zod'
import { defineEventHandler } from 'h3'
import { renderEmailComponent } from '#imports'
import { readJsonBody } from '../../../_helpers/read-json-body'

const bodySchema = z.object({
  name: z.string().min(1),
  locale: z.string().optional(),
  props: z.custom<Record<string, any>>().optional(),
})

export default defineEventHandler(async (event) => {
  const { name, locale, props } = bodySchema.parse(await readJsonBody(event))

  return renderEmailComponent(name, props, { locale })
})
