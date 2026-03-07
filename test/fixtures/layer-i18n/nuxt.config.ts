import MyModule from '../../../src/module'

export default defineNuxtConfig({
  extends: ['./layers/base'],
  modules: [MyModule, '@nuxtjs/i18n'],
})
