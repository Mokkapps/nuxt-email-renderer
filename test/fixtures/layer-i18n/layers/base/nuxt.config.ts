export default defineNuxtConfig({
  // The i18n module and its options live in the layer.
  // @nuxtjs/i18n resolves locale files relative to this layer's directory
  // (i18n/locales/<file> by default in @nuxtjs/i18n v10).
  i18n: {
    locales: [
      { code: 'en', files: ['en.json', 'en-emails.json'] },
      { code: 'de', file: 'de.yaml' },
      // Object form of a locale file entry, supported since @nuxtjs/i18n v10.
      { code: 'es', files: [{ path: 'es.yml' }] },
    ],
    defaultLocale: 'en',
  },
})
