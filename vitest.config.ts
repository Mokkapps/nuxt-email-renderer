import { defineVitestProject } from '@nuxt/test-utils/config'
import { defineConfig } from 'vitest/config'

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
      {
        test: {
          include: ['test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
          name: 'module-e2e',
          environment: 'node',
          hookTimeout: 180_000,
          testTimeout: 60_000,
        },
      },
    ],
  },
})
