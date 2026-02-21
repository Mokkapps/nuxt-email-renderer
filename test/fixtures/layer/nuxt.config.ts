import MyModule from '../../../src/module'

export default defineNuxtConfig({
  extends: ['./layers/test'],
  modules: [
    MyModule,
  ],
})
