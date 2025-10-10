import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('Prerendering', async () => {
  await setup({
    rootDir: resolve(__dirname, './fixtures/prerender'),
    nuxtConfig: {
      nitro: {
        prerender: {
          crawlLinks: true,
        },
      },
    },
  })

  it('renders the index page without errors', async () => {
    const html = await $fetch('/')
    expect(html).toContain('Prerender Test')
  })

  it('API routes should not be prerendered', async () => {
    // This should work even though API routes exist
    // because they are excluded from prerendering via routeRules
    const response = await $fetch('/api/emails')
    expect(Array.isArray(response)).toBe(true)
  })

  it('can render email templates via API', async () => {
    const response = await $fetch('/api/emails/render', {
      method: 'POST',
      body: {
        name: 'Welcome',
        props: {
          name: 'Test User',
        },
      },
    })
    expect(response).toContain('Welcome Test User')
    expect(response).toContain('This is a test email template')
  })
})
