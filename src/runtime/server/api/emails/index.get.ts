import { defineEventHandler } from 'h3'
import type { EmailTemplate } from '../../../types'
import { getEmailTemplateInfos } from '../../utils/email'

export default defineEventHandler((): EmailTemplate[] =>
  getEmailTemplateInfos().map(({ name, filename, displayName }) => ({ name, filename, displayName })),
)
