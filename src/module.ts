import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import {
  addServerHandler,
  addServerImports,
  addServerTemplate,
  addTypeTemplate,
  createResolver,
  defineNuxtModule,
  getLayerDirectories,
  hasNuxtModule,
  logger,
} from '@nuxt/kit'
import vue from '@vitejs/plugin-vue'
import { setupDevToolsUI } from './devtools'
import { loadI18nConfig } from './i18n'
import { nitroInlineAssetPlugin } from './inline-asset-plugin'
import { emailComponentFiles } from './runtime/components'
import { generateComponentsModule, generateTemplatesModule, scanEmailTemplates } from './templates'

export type { DevtoolsPreviewPropsContext, EmailTemplate } from './runtime/types'
export type { RenderOptions, RenderResult } from './runtime/server/utils/render'

export interface ModuleOptions {
  /**
   * Folder where email templates are stored, absolute or relative to each layer's root.
   * Defaults to `emails` in the layer's `srcDir` (`app/emails`), then `emails` in its root.
   */
  emailsDir?: string
  /**
   * Enable Nuxt Devtools integration
   *
   * @default true
   */
  devtools: boolean
  /**
   * Enable the ECodeBlock component and Shiki code highlighting.
   * Disable this when you don't use ECodeBlock to avoid bundling Shiki.
   *
   * @default true
   */
  codeHighlighting: boolean
  /**
   * Paths to CSS files (relative to the project root) whose content is automatically
   * injected into **every** rendered email as a `<style>` tag inside `<head>`.
   * Use this to share CSS custom properties (variables), resets, or font declarations
   * between your website and email templates.
   *
   * @example
   * ```ts
   * nuxtEmailRenderer: {
   *   globalCss: ['assets/css/variables.css']
   * }
   * ```
   */
  globalCss?: string[]
}

const LOGGER_PREFIX = 'Nuxt Email Renderer:'
/** Dev-only endpoints for the DevTools client. */
export const DEVTOOLS_API_ROUTE = '/__nuxt-email-renderer/api'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-email-renderer',
    configKey: 'nuxtEmailRenderer',
    compatibility: { nuxt: '>=4.1.0' },
  },
  defaults: {
    devtools: true,
    codeHighlighting: true,
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // One templates directory per layer, highest priority first.
    const layers = getLayerDirectories(nuxt)
    const templatesDirs = layers.flatMap((layer) => {
      const candidates = [join(layer.app, 'emails'), join(layer.root, 'emails')]
      if (options.emailsDir) candidates.unshift(resolve(layer.root, options.emailsDir))
      return candidates.find(dir => existsSync(dir)) ?? []
    })
    if (options.emailsDir && !existsSync(resolve(layers[0]!.root, options.emailsDir))) {
      logger.warn(`${LOGGER_PREFIX} Configured emailsDir '${options.emailsDir}' not found, falling back to auto-detection.`)
    }
    if (templatesDirs.length === 0) {
      logger.warn(`${LOGGER_PREFIX} No email templates directory found. Create 'app/emails' or configure emailsDir.`)
    }

    // Generated server modules: the user's templates and the built-in components.
    addServerTemplate({
      filename: '#email-templates',
      getContents: async () => {
        const templates = await scanEmailTemplates(templatesDirs)
        logger.success(`${LOGGER_PREFIX} Found ${templates.length} email template(s)`)
        return generateTemplatesModule(templates)
      },
    })
    const components = Object.fromEntries(Object.entries(emailComponentFiles)
      .filter(([name]) => options.codeHighlighting || name !== 'ECodeBlock')
      .map(([name, file]) => [name, resolver.resolve('./runtime/components', file)]))
    addServerTemplate({
      filename: '#email-components',
      getContents: () => generateComponentsModule(components),
    })

    // Server-only config. Public runtime config is serialized into every page payload.
    const hasI18n = hasNuxtModule('@nuxtjs/i18n')
    const emailConfig: Record<string, unknown> = {
      ...options,
      emailsDir: templatesDirs[0],
      globalCss: readGlobalCss(nuxt.options.rootDir, options.globalCss),
    }
    nuxt.options.runtimeConfig.nuxtEmailRenderer = emailConfig
    if (hasI18n) {
      // @nuxtjs/i18n finishes its options after this module's setup.
      nuxt.hook('modules:done', async () => {
        emailConfig.i18n = await loadI18nConfig(nuxt)
      })
    }

    nuxt.hook('nitro:config', (nitroConfig) => {
      // Email templates need their own Vue compiler in the server bundle, with
      // whitespace preserved as written.
      nitroConfig.rollupConfig ||= {}
      const plugins = nitroConfig.rollupConfig.plugins
      nitroConfig.rollupConfig.plugins = [
        nitroInlineAssetPlugin(),
        vue({
          isProduction: !nuxt.options.dev,
          template: { compilerOptions: { whitespace: 'preserve' } },
        }),
        ...(Array.isArray(plugins) ? plugins : plugins ? [plugins] : []),
      ] as never

      if (hasI18n) {
        // Bundle vue-i18n so strict package managers (pnpm) need no direct dependency.
        nitroConfig.externals ||= {}
        nitroConfig.externals.inline = [...nitroConfig.externals.inline ?? [], 'vue-i18n']
      }
      else {
        // vue-i18n is an optional peer dependency and only imported with i18n.
        const external = nitroConfig.rollupConfig.external
        nitroConfig.rollupConfig.external = [
          ...(Array.isArray(external) ? external : external ? [external] : []),
          'vue-i18n',
        ] as never
      }
    })

    addServerImports([{
      name: 'renderEmailComponent',
      from: resolver.resolve('./runtime/server/utils/email'),
    }])

    if (nuxt.options.dev) {
      // Restart when templates are added or removed so `#email-templates` is
      // regenerated. Listing the directories also watches those outside srcDir.
      nuxt.options.watch.push(...templatesDirs)
      nuxt.hook('builder:watch', (event, path) => {
        const file = resolve(nuxt.options.srcDir, path)
        if ((event === 'add' || event === 'unlink') && file.endsWith('.vue') && templatesDirs.includes(dirname(file))) {
          return nuxt.callHook('restart')
        }
      })

      for (const [route, file] of [['templates', 'index.get'], ['render', 'render.post'], ['source', 'source.post']]) {
        addServerHandler({
          route: `${DEVTOOLS_API_ROUTE}/${route}`,
          handler: resolver.resolve(`./runtime/server/api/emails/${file}`),
        })
      }
      if (options.devtools) setupDevToolsUI(nuxt, resolver)
    }

    addTypeTemplate({
      filename: 'types/nuxt-email-renderer.d.ts',
      getContents: () => `
import type { EmailComponentMap } from 'nuxt-email-renderer/components'

type EmailComponents = ${options.codeHighlighting ? 'EmailComponentMap' : `Omit<EmailComponentMap, 'ECodeBlock'>`}

declare module 'vue' {
  interface GlobalComponents extends EmailComponents {}
}

declare module 'nitropack/types' {
  interface NitroRuntimeHooks {
    'nuxt-email-renderer:devtools:resolveProps': (
      context: import('nuxt-email-renderer').DevtoolsPreviewPropsContext
    ) => void | Promise<void>
  }
}

export {}
`,
    }, { nuxt: true, nitro: true })
  },
})

/** Concatenate the configured global CSS files, relative to the project root. */
function readGlobalCss(rootDir: string, paths: string[] = []) {
  return paths.flatMap((path) => {
    const file = resolve(rootDir, path)
    if (existsSync(file)) return readFileSync(file, 'utf-8')
    logger.warn(`${LOGGER_PREFIX} globalCss file not found: ${file}`)
    return []
  }).join('\n')
}
