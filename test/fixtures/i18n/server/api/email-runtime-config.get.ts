import { defineEventHandler, useRuntimeConfig } from '#imports'

export default defineEventHandler(() => {
  const config = useRuntimeConfig()
  const publicI18n = config.public.i18n as Record<string, unknown> | undefined
  const emailConfig = config.nuxtEmailRenderer as {
    emailsDir?: string
    devtools?: boolean
    i18n?: {
      defaultLocale?: string
      messages?: Record<string, Record<string, string>>
    }
  } | undefined

  return {
    publicEmailConfig: config.public.nuxtEmailRenderer,
    publicEmailMessages: publicI18n?.messages,
    privateEmailsDir: emailConfig?.emailsDir,
    privateDevtools: emailConfig?.devtools,
    privateDefaultLocale: emailConfig?.i18n?.defaultLocale,
    privateEnglishGreeting: emailConfig?.i18n?.messages?.en?.greeting,
  }
})
