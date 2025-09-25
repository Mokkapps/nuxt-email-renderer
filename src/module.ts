import { join } from 'node:path'
import { existsSync } from 'node:fs'
import { defu } from 'defu'
import vue from '@vitejs/plugin-vue'
import {
  defineNuxtModule,
  createResolver,
  addComponentsDir,
  addServerHandler,
} from '@nuxt/kit'
import { setupDevToolsUI } from './devtools'

export interface ModuleOptions {
  /**
   * Folder where email templates are stored. Can be either an absolute path or relative to the project root.
   *
   * @default /emails
   */
  emailsDir: string
  /**
   * Enable Nuxt Devtools integration
   *
   * @default true
   */
  devtools: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-email-renderer',
    configKey: 'nuxtEmailRenderer',
  },
  // Default configuration options of the Nuxt module
  defaults() {
    return {
      emailsDir: '/emails',
      devtools: true,
    }
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const { resolve } = createResolver(import.meta.url)

    // Configure Nitro to handle Vue components properly
    nuxt.options.nitro ||= {}
    nuxt.options.nitro.rollupConfig ||= {}

    // Add Vue plugin with proper configuration for email rendering
    const vuePlugin = vue({
      isProduction: true,
      template: {
        compilerOptions: {
          // Ensure compatibility with email clients
          whitespace: 'preserve',
        },
      },
    })

    // Ensure plugins is an array and add the Vue plugin
    if (Array.isArray(nuxt.options.nitro.rollupConfig.plugins)) {
      nuxt.options.nitro.rollupConfig.plugins.push(vuePlugin as never)
    }
    else {
      nuxt.options.nitro.rollupConfig.plugins = [vuePlugin as never]
    }

    nuxt.options.runtimeConfig.public.nuxtEmailRenderer = defu(
      nuxt.options.runtimeConfig.public.nuxtEmailRenderer as ModuleOptions,
      options,
    )

    let templatesDir = resolve(options.emailsDir) || resolve('/emails')

    for (const layer of nuxt.options._layers) {
      const templatePath = join(layer.cwd, '/emails')
      const pathFound = existsSync(templatePath)

      if (!pathFound) continue
      templatesDir = templatePath
      break
    }
    (
      nuxt.options.runtimeConfig.public.nuxtEmailRenderer as ModuleOptions
    ).emailsDir = templatesDir

    nuxt.options.nitro.alias = nuxt.options.nitro.alias || {}
    nuxt.options.nitro.externals = defu(
      typeof nuxt.options.nitro.externals === 'object'
        ? nuxt.options.nitro.externals
        : {},
      {
        inline: [resolve('./runtime')],
      },
    )

    nuxt.options.nitro.alias = defu(nuxt.options.nitro.alias, {
      '#nuxt-email-renderer': resolve('./runtime/server/utils'),
    })

    nuxt.options.nitro.serverAssets = nuxt.options.nitro.serverAssets || []
    nuxt.options.nitro.serverAssets.push({
      baseName: 'emails',
      dir: templatesDir,
    })

    addComponentsDir({
      path: resolve('./runtime/components'),
      global: true,
    })

    addComponentsDir({
      path: templatesDir,
      extensions: ['vue'],
      global: true,
    })

    // Add server handler for email rendering
    addServerHandler({
      route: '/api/emails/render',
      handler: resolve('./runtime/server/api/emails/render.post'),
    })

    // Add server handler for listing email templates
    addServerHandler({
      route: '/api/emails/list',
      handler: resolve('./runtime/server/api/emails/list.get'),
    })

    if (options.devtools) setupDevToolsUI(nuxt, resolver)
  },
})
