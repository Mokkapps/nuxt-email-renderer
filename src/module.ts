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

    // Add server handlers for DevTools integration (development only)
    // These endpoints are only registered when the consuming app is in development mode
    // In production, developers should use the renderEmailComponent function directly
    if (nuxt.options.dev) {
      logger.info('[nuxt-email-renderer] Registering dev-only API endpoints')
      
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

    // Add email component type declarations for auto-completion in email templates
    addTypeTemplate({
      filename: 'types/nuxt-email-renderer-components.d.ts',
      getContents: async () => {
        const componentsPath = resolver.resolve('./runtime/components')

        // Dynamically import the emailComponents to get the component list
        const { emailComponents } = await import(
          './runtime/components/index'
        )
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
