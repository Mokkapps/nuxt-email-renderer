import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [MyModule, '@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'en', name: 'English' },
      { code: 'de', name: 'Deutsch' },
      { code: 'es', name: 'Español' },
    ],
    defaultLocale: 'en',
    vueI18n: './i18n.config.ts',
  },
})
