import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('E2E App Structure (Nuxt 4)', async () => {
  await setup({
    rootDir: resolve(__dirname, './fixtures/app-structure'),
  })

  it('renders the index page', async () => {
    const html = await $fetch('/')
    // Just verify we get some HTML response - the exact structure may vary
    expect(html).toContain('<!DOCTYPE html>')
  })
})
