import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('E2E Layer', async () => {
  await setup({
    rootDir: resolve(__dirname, './fixtures/layer'),
  })

  it('renders the index page', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/')
    expect(html).toContain('<div>Layer Test</div>')
  })

  it('renders an email template from the sub-layer', async () => {
    const response = await $fetch('/api/send-email', {
      method: 'POST',
      body: { name: 'Test' },
    })
    expect(typeof response).toBe('string')
    expect(response).toContain('<!DOCTYPE html')
  })

  it('renders an email template from the app layer', async () => {
    const response = await $fetch('/api/send-email', {
      method: 'POST',
      body: { name: 'AppEmail' },
    })
    expect(typeof response).toBe('string')
    expect(response).toContain('<!DOCTYPE html')
    expect(response).toContain('App Layer Email')
  })
})
