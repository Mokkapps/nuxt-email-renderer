import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    MyModule,
  ],
  nuxtEmailRenderer: {
    globalCss: ['assets/css/variables.css'],
  },
})
