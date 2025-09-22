import { join } from 'node:path'
import { existsSync } from 'node:fs'
import { defu } from 'defu'
import vue from '@vitejs/plugin-vue'
import { defineNuxtModule, createResolver, addComponentsDir, addServerHandler } from '@nuxt/kit'

export interface ModuleOptions {
  emailsDir: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-email',
    configKey: 'nuxtEmail',
  },
  // Default configuration options of the Nuxt module
  defaults() {
    return {
      emailsDir: '/emails',
    }
  },
  setup(options, nuxt) {
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

    nuxt.options.runtimeConfig.public.nuxtEmail = defu(
      nuxt.options.runtimeConfig.public.nuxtEmail,
      options,
    )

    let templatesDir = resolve(options.emailsDir) || resolve('/emails')

    for (const layer of nuxt.options._layers) {
      const templatePath = join(layer.cwd, '/emails')
      const pathFound = existsSync(templatePath)

      if (!pathFound)
        continue
      templatesDir = templatePath
      break
    }
    nuxt.options.runtimeConfig.public.nuxtEmail.emailsDir = templatesDir

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
      '#nuxt-email': resolve('./runtime/server/nitro'),
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
      // TODO: add options to add a custom path and indicate if is absolute or relative
      // for example (absolute o relative):
      // path: options?.absolutePath ? resolve('emails') : templatesDir ,
      //
      // custom:
      // path: options?.emailsDir || templatesDir,
      path: templatesDir,
      extensions: ['vue'],
      global: true,
    })

    // Add server handler for email rendering
    addServerHandler({
      route: '/api/emails/render',
      handler: resolve('./runtime/server/api/emails/render')
    })

    // Add server handler for listing email templates
    addServerHandler({
      route: '/api/emails/list',
      handler: resolve('./runtime/server/api/emails/list')
    })
  },
})
