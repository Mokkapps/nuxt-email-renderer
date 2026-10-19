export default defineNuxtConfig({
  modules: ['nuxt-email-renderer'],
  devtools: { enabled: false },
  routeRules: process.env.EMAIL_TEST_PRERENDER === 'true'
    ? { '/': { prerender: true } }
    : {},
  compatibilityDate: '2025-07-15',
  nuxtEmailRenderer: { devtools: false },
})
