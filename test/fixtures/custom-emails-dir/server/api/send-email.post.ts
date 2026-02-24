import z from 'zod'
import { defineEventHandler, readValidatedBody } from 'h3'
import { renderEmailComponent } from '#imports'

const bodySchema = z.object({
  name: z.string().min(1),
})

export default defineEventHandler(async (event) => {
  const { name } = await readValidatedBody(event, bodySchema.parse)

  return renderEmailComponent(name)
})
