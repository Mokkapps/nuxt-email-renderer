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
import {
  generateTemplateMapping,
  generateVirtualModule,
} from './runtime/server/utils/virtual-templates'

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

    // Generate virtual module for email templates during build
    nuxt.hooks.hook('nitro:config', async (nitroConfig) => {
      try {
        // Generate template mapping at build time
        const templateMapping = await generateTemplateMapping(templatesDir)
        const virtualModuleContent = generateVirtualModule(templateMapping)

        // Add virtual module to Nitro
        nitroConfig.virtual = nitroConfig.virtual || {}
        nitroConfig.virtual['#email-templates'] = virtualModuleContent

        // Also create alias for easier importing
        nitroConfig.alias = nitroConfig.alias || {}
        nitroConfig.alias['#email-templates'] = 'virtual:#email-templates'

        console.log(
          `[nuxt-email-renderer] Generated virtual module for ${
            Object.keys(templateMapping).length
          } email templates`,
        )
      }
      catch (error) {
        console.error(
          '[nuxt-email-renderer] Failed to generate virtual module:',
          error,
        )
      }
    })

    nuxt.options.nitro.serverAssets = nuxt.options.nitro.serverAssets || []
    nuxt.options.nitro.serverAssets.push({
      baseName: 'emails',
      dir: templatesDir,
    })

    addComponentsDir({
      path: resolve('./runtime/components'),
      extensions: ['vue'],
      global: true,
    })

    addComponentsDir({
      path: templatesDir,
      extensions: ['vue'],
      global: true,
    })

    // Add server handlers
    addServerHandler({
      route: '/api/emails/render',
      handler: resolve('./runtime/server/api/emails/render.post'),
    })

    addServerHandler({
      route: '/api/emails/source',
      handler: resolve('./runtime/server/api/emails/source.post'),
    })

    addServerHandler({
      route: '/api/emails',
      handler: resolve('./runtime/server/api/emails/index.get'),
    })

    if (options.devtools) setupDevToolsUI(nuxt, resolver)
  },
})
