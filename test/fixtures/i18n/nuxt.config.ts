import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    MyModule,
  ],
  nuxtEmailRenderer: {
    i18n: {
      enabled: true,
      defaultLocale: 'en',
      localesDir: './emails/locales',
    },
  },
})
