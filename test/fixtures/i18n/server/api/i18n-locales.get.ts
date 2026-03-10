import { defineEventHandler, useRuntimeConfig } from '#imports'

interface I18nRuntimeConfig {
  locales?: Array<Record<string, string>>
}

export default defineEventHandler(() => {
  const config = useRuntimeConfig()
  return (config.public.i18n as I18nRuntimeConfig)?.locales ?? []
})
