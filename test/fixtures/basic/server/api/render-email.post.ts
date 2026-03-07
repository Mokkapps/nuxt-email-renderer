import z from 'zod'
import { defineEventHandler, readValidatedBody } from 'h3'
import { renderEmail } from '#imports'

const bodySchema = z.object({
  name: z.string().min(1),
  props: z.custom<Record<string, any>>().optional(),
})

export default defineEventHandler(async (event) => {
  const { name, props } = await readValidatedBody(event, bodySchema.parse)

  // renderEmail is an alias for renderEmailComponent
  return renderEmail(name, props)
})
