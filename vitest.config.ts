import { defineVitestProject } from '@nuxt/test-utils/config'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
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
      }),
    ],
  },
})
