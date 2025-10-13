import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('E2E', async () => {
  await setup({
    rootDir: resolve(__dirname, './fixtures/basic'),
  })

  it('renders the index page', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/')
    expect(html).toContain('<div>basic</div>')
  })

  it('returns HTML from custom API endpoint', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const response = await $fetch('/api/send-email', {
      method: 'POST',
      body: { name: 'Test' },
    })
    expect(response).toMatchSnapshot()
  })
})
