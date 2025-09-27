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

  describe('API', () => {
    it('returns a list of all available emails from layer', async () => {
      const response = await $fetch('/api/emails')
      expect(response).toEqual([{
        displayName: 'Test',
        filename: 'Test.vue',
        name: 'Test',
      }])
    })

    it('returns the rendered email from layer as HTML', async () => {
      const response = await $fetch('/api/emails/render', {
        method: 'POST',
        body: {
          name: 'Test',
        },
      })
      expect(response).toMatchSnapshot()
    })
  })
})
