import { join } from 'node:path'
import {
  logger,
  defineNuxtModule,
  createResolver,
  addServerHandler,
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

const LOGGER_PREFIX = 'Nuxt Email Renderer:'

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

    // Check if @nuxtjs/i18n module is installed and configure i18n support
    nuxt.hook('nitro:config', async () => {
      const hasI18n = nuxt.options.modules.some((m) => {
        if (typeof m === 'string') {
          return m.includes('@nuxtjs/i18n')
        }
        if (Array.isArray(m)) {
          const first = m[0]
          return typeof first === 'string' && first.includes('@nuxtjs/i18n')
        }
        return false
      })

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (hasI18n && (nuxt.options as any).i18n) {
        // Store i18n configuration in runtime config for server-side email rendering
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const i18nOptions = (nuxt.options as any).i18n

        const publicI18n
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          = (nuxt.options.runtimeConfig.public.i18n as any) || {}

        // Try to load messages from vueI18n config
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let messages: Record<string, any> = {}
        if (i18nOptions.vueI18n && typeof i18nOptions.vueI18n === 'string') {
          try {
            const configPath = resolve(
              nuxt.options.rootDir,
              i18nOptions.vueI18n,
            )
            const { pathToFileURL } = await import('node:url')

            // Import the i18n config file
            const configModule = await import(pathToFileURL(configPath).href)
            const configResult
              = typeof configModule.default === 'function'
                ? configModule.default()
                : configModule.default

            if (configResult && configResult.messages) {
              messages = configResult.messages
              logger.success(
                `${LOGGER_PREFIX} Loaded i18n messages for ${Object.keys(messages).length} locale(s)`,
              )
            }
          }
          catch (error) {
            logger.warn(
              `${LOGGER_PREFIX} Could not load i18n messages from config file: ${error}`,
            )
          }
        }
        else if (
          i18nOptions.vueI18n
          && typeof i18nOptions.vueI18n === 'object'
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          messages = (i18nOptions.vueI18n as any).messages || {}
        }

        // Store essential i18n configuration
        nuxt.options.runtimeConfig.public.i18n = defu(publicI18n, {
          defaultLocale:
            i18nOptions.defaultLocale || i18nOptions.locale || 'en',
          locales: i18nOptions.locales || [],
          messages,
          vueI18n:
            typeof i18nOptions.vueI18n === 'object' ? i18nOptions.vueI18n : {},
        })

        logger.info(
          `${LOGGER_PREFIX} i18n support enabled with default locale: ${i18nOptions.defaultLocale || i18nOptions.locale || 'en'}`,
        )
      }
    })

    let templatesDir = resolve(options.emailsDir) || resolve('/emails')

    // Check for email templates in layer directories
    // Priority: app/emails (Nuxt 4 structure) > emails (root folder)
    for (const layer of nuxt.options._layers) {
      // First check app/emails (Nuxt 4 structure)
      const appEmailsPath = join(layer.cwd, 'app', 'emails')
      if (existsSync(appEmailsPath)) {
        templatesDir = appEmailsPath
        break
      }

      // Fall back to root emails folder
      const rootEmailsPath = join(layer.cwd, 'emails')
      if (existsSync(rootEmailsPath)) {
        templatesDir = rootEmailsPath
        break
      }
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
          `${LOGGER_PREFIX} Generated virtual module with ${
            Object.keys(templateMapping).length
          } email template(s)`,
        )
      }
      catch (error) {
        logger.error(
          `${LOGGER_PREFIX} Failed to generate virtual module`,
          error,
        )
      }
    })

    // Enable HMR for email templates in development mode
    if (nuxt.options.dev) {
      // Watch templates directory for changes
      nuxt.options.watch = nuxt.options.watch || []
      nuxt.options.watch.push(`${templatesDir}/**/*.vue`)

      nuxt.hooks.hook('builder:watch', async (event, path) => {
        if (path.startsWith(templatesDir) && path.endsWith('.vue')) {
          logger.info(`${LOGGER_PREFIX} Template ${event} - ${path}`)
          logger.info(`${LOGGER_PREFIX} Server will restart to apply changes`)
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

    // Add server handlers for DevTools integration (development only)
    // These endpoints are only registered when the consuming app is in development mode
    // In production, developers should use the renderEmailComponent function directly
    if (nuxt.options.dev) {
      logger.info(`${LOGGER_PREFIX} Registering dev-only API endpoints`)

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
    }

    // Add email component type declarations for auto-completion in email templates
    addTypeTemplate({
      filename: 'types/nuxt-email-renderer-components.d.ts',
      getContents: async () => {
        const componentsPath = resolver.resolve('./runtime/components')

        // Dynamically import the emailComponents to get the component list
        const { emailComponents } = await import('./runtime/components/index')
        const componentNames = Object.keys(emailComponents)

        // Helper function to convert component name to file path
        // E.g., "ECodeBlock" -> "code-block/ECodeBlock.vue"
        const getComponentPath = (name: string) => {
          // Remove the 'E' prefix and convert to kebab-case
          const baseName = name.slice(1) // Remove 'E'
          const kebabCase = baseName
            .replace(/([A-Z])/g, '-$1')
            .toLowerCase()
            .slice(1)
          return `${kebabCase}/${name}.vue`
        }

        // Generate type declarations for each component
        const generateComponentTypes = (names: string[]) => {
          return names
            .map((name) => {
              const componentPath = getComponentPath(name)
              const importPath = join(componentsPath, componentPath).replace(
                /\\/g,
                '/',
              )
              return `    ${name}: typeof import('${importPath}').default`
            })
            .join('\n')
        }

        const componentTypes = generateComponentTypes(componentNames)

        return `
// Auto-generated email component types for nuxt-email-renderer
// This file is automatically generated based on the components in emailComponents.
// Do not edit this file manually - it will be regenerated on every build.
// To add new components, add them to src/runtime/components/index.ts
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
${componentTypes}
  }
}

declare module 'vue' {
  export interface GlobalComponents {
${componentTypes}
  }
}

export {}
`
      },
    })

    if (options.devtools) setupDevToolsUI(nuxt, resolver)
  },
})
