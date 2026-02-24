import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('E2E Custom emailsDir', async () => {
  await setup({
    rootDir: resolve(__dirname, './fixtures/custom-emails-dir'),
  })

  it('renders the index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<div>custom-emails-dir</div>')
  })

  it('renders email template from custom emailsDir', async () => {
    const response = await $fetch('/api/send-email', {
      method: 'POST',
      body: { name: 'Welcome' },
    })

    expect(typeof response).toBe('string')
    expect(response).toContain('<!DOCTYPE html')
    expect(response).toContain('Hello from custom emails dir!')
  })
})
