export default defineNuxtConfig({
  modules: ['nuxt-email-renderer'],
  // DevTools only run in development; the test checks the email tab there.
  devtools: { enabled: true, telemetry: false },
  routeRules: process.env.EMAIL_TEST_PRERENDER === 'true'
    ? { '/': { prerender: true } }
    : {},
  compatibilityDate: '2025-07-15',
})
