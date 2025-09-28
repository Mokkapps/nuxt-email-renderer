import { resolve } from 'pathe'

export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxt/devtools-ui-kit',
    '@vueuse/nuxt',
  ],

  ssr: false,

  devtools: { enabled: true, componentInspector: false, viteInspect: false },

  app: {
    baseURL: '/__nuxt-email-renderer',
  },

  compatibilityDate: '2024-08-21',

  nitro: {
    output: {
      publicDir: resolve(__dirname, '../dist/client'),
    },
  },

  vite: {
    server: {
      hmr: {
        // Instead of go through proxy, we directly connect real port of the client app
        clientPort: +(process.env.PORT || 3300),
      },
    },
  },

  nuxtEmailRenderer: {
    devtools: false,
    emailsDir: '/playground/emails',
  },
})
