import { existsSync } from 'node:fs'
import type { Nuxt } from 'nuxt/schema'
import type { Resolver } from '@nuxt/kit'
import { addCustomTab } from '@nuxt/devtools-kit'

const DEVTOOLS_UI_ROUTE = '/__nuxt-email-renderer'
const DEVTOOLS_UI_LOCAL_PORT = 3300

export function setupDevToolsUI(nuxt: Nuxt, resolver: Resolver) {
  const clientPath = resolver.resolve('./client')

  // The published package ships a prebuilt client.
  if (existsSync(clientPath)) {
    nuxt.hook('vite:serverCreated', async (server) => {
      const { default: sirv } = await import('sirv')
      server.middlewares.use(
        DEVTOOLS_UI_ROUTE,
        // No SPA fallback: requests to the dev API must reach Nitro.
        sirv(clientPath, { dev: true }),
      )
    })
  }
  // In this repository, `pnpm client:dev` serves the client on a separate port.
  else {
    nuxt.hook('vite:extendConfig', (config) => {
      config.server ||= {}
      config.server.proxy ||= {}
      // Everything except the dev API, which this server handles.
      config.server.proxy[`^${DEVTOOLS_UI_ROUTE}(?!/api/)`] = {
        target: `http://localhost:${DEVTOOLS_UI_LOCAL_PORT}${DEVTOOLS_UI_ROUTE}`,
        changeOrigin: true,
        followRedirects: true,
        rewrite: path => path.replace(DEVTOOLS_UI_ROUTE, ''),
      }
    })
  }

  addCustomTab({
    name: 'nuxt-email-renderer',
    title: 'Nuxt Email Renderer',
    icon: 'twemoji:incoming-envelope',
    view: {
      type: 'iframe',
      src: DEVTOOLS_UI_ROUTE,
    },
  }, nuxt)
}
