import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    MyModule,
  ],
  // Enable prerendering for testing
  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
  },
})
