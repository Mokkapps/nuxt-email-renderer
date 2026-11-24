import { readFile } from 'node:fs/promises'
import { createError, defineEventHandler, readValidatedBody } from 'nuxt/server'
import z from 'zod'
import { getEmailTemplateInfo } from '../../utils/email'

const bodySchema = z.object({
  name: z.string().nonempty(),
})

export default defineEventHandler(async (event) => {
  const { name } = await readValidatedBody(event, bodySchema)
  const template = getEmailTemplateInfo(name)
  if (!template) {
    throw createError({
      status: 404,
      statusText: `Email template "${name}" not found`,
    })
  }

  return {
    filename: template.filename,
    filePath: template.filePath,
    sourceCode: await readFile(template.filePath, 'utf-8'),
  }
})
