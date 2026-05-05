import type { Plugin } from 'vite'
import { defineVitestProject } from '@nuxt/test-utils/config'
import { defineConfig } from 'vitest/config'

// @nuxt/test-utils@4 has a `setupBun` function that dynamically imports 'bun:test'
// without a `/* vite-ignore */` comment. Vite 7's client environment has
// `resolve.noExternal: true` (set by Vitest) and treats `bun:*` as node-like
// built-ins, causing "Cannot bundle built-in module 'bun:test'" errors.
//
// Vitest's `vitest:environments-module-runner` plugin uses a
// `configEnvironment: { order: 'post' }` hook to reset `resolve.external` to
// only Node.js built-ins (excluding Bun built-ins like `bun:test`). The plugin
// below also uses `order: 'post'` but is placed after Vitest's plugin in the
// plugins array, so it runs last and can append `bun:test` to the final
// `external` list. Vite then externalizes `bun:test` as a browser-external stub
// (never actually invoked in Node.js environments).
const externalizeBunTestPlugin: Plugin = {
  name: 'nuxt-email-renderer:externalize-bun-test',
  // `enforce: 'post'` places this plugin into Vite's `postPlugins` bucket,
  // which is iterated after `normalPlugins` when building the sorted hook list.
  // Vitest's `ModuleRunnerTransform` lives in `normalPlugins` and its
  // `configEnvironment: { order: 'post' }` hook resets `resolve.external` to
  // only Node.js built-ins. By using `enforce: 'post'` here our own
  // `configEnvironment: { order: 'post' }` hook is queued behind it and can
  // safely append `bun:test` to the final externals list.
  enforce: 'post',
  configEnvironment: {
    order: 'post',
    handler(name, config) {
      if (name !== 'client') return
      if (Array.isArray(config.resolve?.external)) {
        if (!config.resolve.external.includes('bun:test')) {
          config.resolve.external.push('bun:test')
        }
      }
    },
  },
}

export default defineConfig({
  test: {
    coverage: {
      include: [
        'src/**/*.{js,ts,vue}',
      ],
      reporter: ['text', 'json-summary', 'json'],
    },
    projects: [
      await defineVitestProject({
        test: {
          include: ['src/runtime/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
          name: 'module',
        },
      }),
      await defineVitestProject({
        test: {
          include: ['test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
          name: 'module-e2e',
        },
        plugins: [externalizeBunTestPlugin],
      }),
    ],
  },
})
