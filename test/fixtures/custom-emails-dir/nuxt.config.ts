import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    MyModule,
  ],
  nuxtEmailRenderer: {
    emailsDir: 'my-emails',
  },
})
