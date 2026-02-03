export default defineNuxtConfig({
  extends: ['docus'],

  modules: ['nuxt-umami'],
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

  llms: {
    domain: 'https://nuxtemail.com',
    title: 'Nuxt Email Renderer',
    description: 'Plug-and-play email template rendering using Vue components. Create beautiful HTML emails with the power of Vue and modern development workflow.',
    full: {
      title: 'Nuxt Email Renderer',
      description: 'Plug-and-play email template rendering using Vue components. Create beautiful HTML emails with the power of Vue and modern development workflow.',
    },
  },

  umami: {
    host: process.env.NUXT_UMAMI_HOST,
    id: process.env.NUXT_UMAMI_ID,
    ignoreLocalhost: true,
  },
})
