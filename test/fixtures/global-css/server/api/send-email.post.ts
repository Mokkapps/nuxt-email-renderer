import z from 'zod'
import { defineEventHandler } from 'h3'
import { renderEmailComponent } from '#imports'
import { readJsonBody } from '../../../_helpers/read-json-body'

const bodySchema = z.object({
  name: z.string().min(1),
  props: z.custom<Record<string, any>>().optional(),
})

export default defineEventHandler(async (event) => {
  const { name, props } = bodySchema.parse(await readJsonBody(event))

  return renderEmailComponent(name, props)
})
