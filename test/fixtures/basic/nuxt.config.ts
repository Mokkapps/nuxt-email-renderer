import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    MyModule,
  ],
  nitro: {
    externals: {
      inline: ['estree-walker'], // force bundle it
    },
  },
})
