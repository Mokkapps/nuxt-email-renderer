import { defineNitroPlugin, useRuntimeConfig } from 'nitropack/runtime'

export default defineNitroPlugin(async () => {
  // This plugin helps capture i18n configuration for email rendering
  try {
    const config = useRuntimeConfig()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const i18nConfig = config.public?.i18n as any

    if (!i18nConfig || !i18nConfig.vueI18n) {
      return
    }

    // If vueI18n is a path to a config file, try to load messages
    if (typeof i18nConfig.vueI18n === 'string') {
      try {
        // Try to dynamically import the i18n config
        const vueI18nModule = await import(
          /* @vite-ignore */ i18nConfig.vueI18n
        ).catch(() => null)

        if (vueI18nModule) {
          const vueI18nConfig
            = typeof vueI18nModule.default === 'function'
              ? vueI18nModule.default()
              : vueI18nModule.default

          if (vueI18nConfig?.messages) {
            // Store messages in runtime config for access during rendering
            i18nConfig.messages = vueI18nConfig.messages
            i18nConfig.vueI18n = {
              ...vueI18nConfig,
              messages: vueI18nConfig.messages,
            }
          }
        }
      }
      catch (error) {
        console.warn(
          '[nuxt-email-renderer] Failed to load i18n messages:',
          error,
        )
      }
    }
  }
  catch {
    // Silently fail if i18n is not configured
  }
})
