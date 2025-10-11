import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    MyModule,
  ],
  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
  },
})
