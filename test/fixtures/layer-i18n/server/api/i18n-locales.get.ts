import { defineEventHandler, useRuntimeConfig } from '#imports'

export default defineEventHandler(() => {
  const config = useRuntimeConfig()
  const i18n = config.public.i18n as {
    locales?: Array<{ code: string }>
  } | undefined

  return i18n?.locales ?? []
})
