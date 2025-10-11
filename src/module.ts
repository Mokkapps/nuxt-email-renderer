import { join } from 'node:path'
import {
  logger,
  defineNuxtModule,
  createResolver,
  addServerHandler,
  addImports,
  addTypeTemplate,
  addServerImports,
} from '@nuxt/kit'
import { existsSync } from 'node:fs'
import { defu } from 'defu'
import vue from '@vitejs/plugin-vue'
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

    // Configure Nitro
    nuxt.options.nitro ||= {}

    // Configure esbuild for TypeScript support
    nuxt.options.nitro.esbuild = nuxt.options.nitro.esbuild || {}
    nuxt.options.nitro.esbuild.options
      = nuxt.options.nitro.esbuild.options || {}
    nuxt.options.nitro.esbuild.options.target
      = nuxt.options.nitro.esbuild.options.target || 'es2020'

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
    // Inline runtime in Nitro bundle
    // Let Nuxt/Nitro handle Vue dependencies to avoid conflicts with other modules
    nuxt.options.nitro.externals = defu(
      typeof nuxt.options.nitro.externals === 'object'
        ? nuxt.options.nitro.externals
        : {},
      {
        inline: [resolve('./runtime')],
      },
    )

    // Setup Nitro aliases
    nuxt.options.nitro.alias = defu(nuxt.options.nitro.alias, {
      '#nuxt-email-renderer': resolve('./runtime/server/utils'),
    })

    addServerImports([
      {
        name: 'renderEmailComponent',
        from: resolver.resolve('runtime/server/utils/render'),
      },
    ])

    // Generate virtual module containing all email templates
    nuxt.hooks.hook('nitro:config', async (nitroConfig) => {
      try {
        // Scan templates directory and generate virtual module
        const templateMapping = await generateTemplateMapping(templatesDir)
        const virtualModuleContent = generateVirtualModule(templateMapping)

        // Add virtual module to Nitro
        nitroConfig.virtual = nitroConfig.virtual || {}
        nitroConfig.virtual['#email-templates'] = virtualModuleContent

        // Create alias for the virtual module
        nitroConfig.alias = nitroConfig.alias || {}
        nitroConfig.alias['#email-templates'] = 'virtual:#email-templates'

        // Configure Vue plugin for Nitro server build
        // We need Vue compilation for email templates in the server bundle
        nitroConfig.rollupConfig = nitroConfig.rollupConfig || {}
        nitroConfig.rollupConfig.plugins
          = nitroConfig.rollupConfig.plugins || []

        // Add Vue plugin with strict include pattern
        // Use array format to be very explicit about what to include
        const vuePlugin = vue({
          include: '**/*.vue', // Only .vue files, nothing else
          isProduction: !nuxt.options.dev,
          script: {
            defineModel: true,
            propsDestructure: true,
          },
          template: {
            compilerOptions: {
              // Preserve whitespace for email client compatibility
              whitespace: 'preserve',
            },
          },
        })

        if (Array.isArray(nitroConfig.rollupConfig.plugins)) {
          nitroConfig.rollupConfig.plugins.unshift(vuePlugin as never)
        }
        else {
          nitroConfig.rollupConfig.plugins = [vuePlugin as never]
        }

        logger.success(
          `Nuxt Email Renderer: Generated virtual module with ${
            Object.keys(templateMapping).length
          } email template(s)`,
        )
      }
      catch (error) {
        logger.error(
          'Nuxt Email Renderer: Failed to generate virtual module',
          error,
        )
      }
    })

    // Enable HMR for email templates in development mode
    if (nuxt.options.dev) {
      // Watch templates directory for changes
      nuxt.options.watch = nuxt.options.watch || []
      nuxt.options.watch.push(`${templatesDir}/**/*.vue`)

      // Log template changes and trigger server restart
      nuxt.hooks.hook('builder:watch', async (event, path) => {
        if (path.startsWith(templatesDir) && path.endsWith('.vue')) {
          logger.info(`Nuxt Email Renderer: Template ${event} - ${path}`)
          logger.info(
            'Nuxt Email Renderer: Server will restart to apply changes',
          )
        }
      })

      // Configure Nitro dev storage for the templates directory
      nuxt.hooks.hook('nitro:config', (nitroConfig) => {
        nitroConfig.devStorage = nitroConfig.devStorage || {}
        nitroConfig.devStorage['emails'] = {
          driver: 'fs',
          base: templatesDir,
        }
      })
    }

    // Add templates directory as Nitro server asset
    nuxt.options.nitro.serverAssets = nuxt.options.nitro.serverAssets || []
    nuxt.options.nitro.serverAssets.push({
      baseName: 'emails',
      dir: templatesDir,
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

    // Add type declarations - makes EmailTemplate types available globally
    addTypeTemplate({
      filename: 'types/nuxt-email-renderer.d.ts',
      getContents: () => `
declare global {
  export type EmailTemplate = {
    name: string
    filename: string
    displayName: string
  }

  export type EmailTemplateInfo = EmailTemplate & {
    importPath: string
    filePath: string
  }

  export type EmailTemplateMapping = Record<string, EmailTemplateInfo>
}

export {}`,
    })

    // Add auto-imports for the types
    addImports([
      {
        name: 'EmailTemplate',
        as: 'EmailTemplate',
        from: resolve('./runtime/types'),
        type: true,
      },
      {
        name: 'EmailTemplateInfo',
        as: 'EmailTemplateInfo',
        from: resolve('./runtime/types'),
        type: true,
      },
      {
        name: 'EmailTemplateMapping',
        as: 'EmailTemplateMapping',
        from: resolve('./runtime/types'),
        type: true,
      },
    ])

    if (options.devtools) setupDevToolsUI(nuxt, resolver)
  },
})
