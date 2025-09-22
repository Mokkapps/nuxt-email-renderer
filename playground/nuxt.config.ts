export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxtjs/tailwindcss',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2025-09-19',
  nuxtEmail: {
    emailsDir: '/playground/emails',
  },
})
