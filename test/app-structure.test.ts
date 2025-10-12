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

  describe('API', () => {
    it('returns a list of all available emails from app/emails directory', async () => {
      const response = await $fetch('/api/emails')
      expect(response).toEqual([{
        displayName: 'App Test',
        filename: 'AppTest.vue',
        name: 'AppTest',
      }])
    })

    it('returns the rendered email from app/emails as HTML', async () => {
      const response = await $fetch('/api/emails/render', {
        method: 'POST',
        body: {
          name: 'AppTest',
        },
      })
      expect(response).toMatchSnapshot()
    })

    it('returns the rendered email from app/emails with props as HTML', async () => {
      const response = await $fetch('/api/emails/render', {
        method: 'POST',
        body: {
          name: 'AppTest',
          props: {
            heading: 'Custom Heading from App',
          },
        },
      })
      expect(response).toMatchSnapshot()
    })
  })
})
