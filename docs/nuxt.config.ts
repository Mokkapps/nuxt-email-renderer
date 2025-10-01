export default defineNuxtConfig({
  extends: ['docus'],
  css: ['~/assets/css/main.css'],
  site: {
    name: 'Nuxt Email Renderer',
  },
  compatibilityDate: '2025-08-07',
  image: {
    domains: ['mokkapps.twic.pics'],
    provider: 'twicpics',
    screens: { '2xl': 1536, 'lg': 1024, 'md': 768, 'sm': 640, 'xl': 1280, 'xs': 320, 'xxl': 1536 },
    twicpics: {
      baseURL: 'https://mokkapps.twic.pics/nuxtemail.com/',
    },
  },
})
