import { readFile } from 'node:fs/promises'
import { createError, defineEventHandler, readValidatedBody } from 'h3'
import z from 'zod'
import { getEmailTemplateInfo } from '../../utils/email'

const bodySchema = z.object({
  name: z.string().nonempty(),
})

export default defineEventHandler(async (event) => {
  const { name } = await readValidatedBody(event, bodySchema.parse)
  const template = getEmailTemplateInfo(name)
  if (!template) {
    throw createError({
      statusCode: 404,
      statusMessage: `Email template "${name}" not found`,
    })
  }

  return {
    filename: template.filename,
    filePath: template.filePath,
    sourceCode: await readFile(template.filePath, 'utf-8'),
  }
})
