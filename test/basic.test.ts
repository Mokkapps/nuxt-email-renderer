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

  describe('API', () => {
    it('returns a list of all available emails', async () => {
      const response = await $fetch('/api/emails')
      expect(response).toEqual([{
        displayName: 'Test',
        filename: 'Test.vue',
        name: 'Test',
      }])
    })

    it('returns the rendered email as HTML', async () => {
      const response = await $fetch('/api/emails/render', {
        method: 'POST',
        body: {
          name: 'Test',
        },
      })
      expect(response).toMatchSnapshot()
    })

    it('returns the rendered email with props as HTML', async () => {
      const response = await $fetch('/api/emails/render', {
        method: 'POST',
        body: {
          name: 'Test',
          props: {
            heading: 'Test Heading',
          },
        },
      })
      expect(response).toMatchSnapshot()
    })

    it('returns the rendered email as formatted HTML', async () => {
      const response = await $fetch('/api/emails/render', {
        method: 'POST',
        body: {
          name: 'Test',
          pretty: true,
        },
      })
      expect(response).toMatchSnapshot()
    })

    it('returns the rendered email as plain text', async () => {
      const response = await $fetch('/api/emails/render', {
        method: 'POST',
        body: {
          name: 'Test',
          plainText: true,
        },
      })
      expect(response).toMatchSnapshot()
    })
  })
})
