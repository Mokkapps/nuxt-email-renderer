import { join, basename, dirname } from 'node:path'
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
   * When set, this takes priority over the auto-detected `app/emails` and `emails` directories.
   * When not set, the module auto-detects the emails directory by checking `app/emails` (Nuxt 4) then `emails`.
   */
  emailsDir?: string
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

    // Collect email template directories from all layers
    // Priority: configured emailsDir > app/emails (Nuxt 4 structure) > emails (root folder)
    // Earlier layers have higher priority over later layers
    const templatesDirs: string[] = []

    for (const layer of nuxt.options._layers) {
      // If emailsDir is explicitly configured, check it first (resolved relative to layer cwd)
      if (options.emailsDir) {
        const customEmailsPath = join(layer.cwd, options.emailsDir)
        if (existsSync(customEmailsPath)) {
          templatesDirs.push(customEmailsPath)
          continue
        }
        // Warn only for the root layer so users know their configured path wasn't found
        if (layer.cwd === nuxt.options.rootDir) {
          logger.warn(`${LOGGER_PREFIX} Configured emailsDir '${options.emailsDir}' not found at '${customEmailsPath}', falling back to auto-detection.`)
        }
      }

      // Auto-detect: check app/emails (Nuxt 4 structure)
      const appEmailsPath = join(layer.cwd, 'app', 'emails')
      if (existsSync(appEmailsPath)) {
        templatesDirs.push(appEmailsPath)
        continue
      }

      // Fall back to root emails folder
      const rootEmailsPath = join(layer.cwd, 'emails')
      if (existsSync(rootEmailsPath)) {
        templatesDirs.push(rootEmailsPath)
      }
    }

    if (templatesDirs.length === 0) {
      logger.warn(`${LOGGER_PREFIX} No email templates directory found. Configure emailsDir or create an 'emails' or 'app/emails' directory.`)
    }

    // The primary templates directory is the highest-priority one (first layer)
    const templatesDir = templatesDirs[0]

    ;(
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
        // Scan all layer template directories and merge the mappings
        // Process in reverse order so higher-priority layers (earlier in array) override lower-priority ones
        const templateMapping: Awaited<ReturnType<typeof generateTemplateMapping>> = {}
        for (const dir of [...templatesDirs].reverse()) {
          const dirMapping = await generateTemplateMapping(dir)
          Object.assign(templateMapping, dirMapping)
        }
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

        // Mark vue-i18n as external to avoid build errors when it's not installed
        // It's dynamically imported only when needed
        nitroConfig.rollupConfig.external
          = nitroConfig.rollupConfig.external || []
        if (Array.isArray(nitroConfig.rollupConfig.external)) {
          nitroConfig.rollupConfig.external.push('vue-i18n')
        }

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
      // Watch all layer template directories for changes
      nuxt.options.watch = nuxt.options.watch || []
      for (const dir of templatesDirs) {
        nuxt.options.watch.push(`${dir}/**/*.vue`)
      }

      nuxt.hooks.hook('builder:watch', async (event, path) => {
        if (templatesDirs.some(dir => path.startsWith(dir)) && path.endsWith('.vue')) {
          logger.info(`${LOGGER_PREFIX} Template ${event} - ${path}`)
          logger.info(`${LOGGER_PREFIX} Server will restart to apply changes`)
        }
      })

      // Configure Nitro dev storage for the primary templates directory
      nuxt.hooks.hook('nitro:config', (nitroConfig) => {
        nitroConfig.devStorage = nitroConfig.devStorage || {}
        nitroConfig.devStorage['emails'] = {
          driver: 'fs',
          base: templatesDir,
        }
      })
    }

    // Add all layer template directories as Nitro server assets
    nuxt.options.nitro.serverAssets = nuxt.options.nitro.serverAssets || []
    for (const [index, dir] of templatesDirs.entries()) {
      const layerName = basename(dirname(dir))
      nuxt.options.nitro.serverAssets.push({
        baseName: index === 0 ? 'emails' : `emails_${layerName}_${index}`,
        dir,
      })
    }

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
    // Note: We use generic Component types instead of importing actual component files
    // to avoid bundling server-only components (and their heavy dependencies like shiki, marked)
    // into the client bundle.
    addTypeTemplate({
      filename: 'types/nuxt-email-renderer-components.d.ts',
      getContents: async () => {
        // Dynamically import the emailComponents to get the component list
        const { emailComponents } = await import('./runtime/components/index')
        const componentNames = Object.keys(emailComponents)

        // Generate type declarations for each component
        // Use DefineComponent generic type instead of importing actual files
        const generateComponentTypes = (names: string[]) => {
          return names
            .map((name) => {
              return `    ${name}: import('vue').DefineComponent<{}, {}, any>`
            })
            .join('\n')
        }

        const componentTypes = generateComponentTypes(componentNames)

        return `
// Auto-generated email component types for nuxt-email-renderer
// This file is automatically generated based on the components in emailComponents.
// Do not edit this file manually - it will be regenerated on every build.
// To add new components, add them to src/runtime/components/index.ts
//
// Note: These components use generic Vue component types to prevent bundling
// server-only dependencies (shiki, marked) into the client bundle.
// Email components are only used server-side for email rendering.
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
