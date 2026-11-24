import { defineEventHandler } from 'nuxt/server'
import type { EmailTemplate } from '../../../types'
import { getEmailTemplateInfos } from '../../utils/email'

export default defineEventHandler((): EmailTemplate[] =>
  getEmailTemplateInfos().map(({ name, filename, displayName }) => ({ name, filename, displayName })),
)
