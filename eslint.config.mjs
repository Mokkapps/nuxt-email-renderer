// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
    // Rules for formatting
    stylistic: true,
  },
  dirs: {
    src: [
      './playground',
      './docs',
    ],
  },
})
  .append(
    {
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
  )
  .append(
    {
      files: ['**/*.test.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['**/server/api/**/*.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['docs/**'],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
    {
      files: ['playground/**'],
      rules: {
        'no-useless-escape': 'off',
      },
    },
  )
