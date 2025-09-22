import { resolve } from 'pathe'

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/devtools-ui-kit',
    '@vueuse/nuxt',
  ],

  ssr: false,

  devtools: { enabled: true, componentInspector: false, viteInspect: false },

  app: {
    baseURL: '/__nuxt-email-renderer',
  },

  css: ['~/assets/css/main.css'],

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
})
