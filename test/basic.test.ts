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

  it('returns subject and HTML from email with ESubject component', async () => {
    const response = await $fetch('/api/send-email', {
      method: 'POST',
      body: { name: 'Test', props: { siteName: 'Acme Corp' } },
    }) as any

    // Should have subject property
    expect(response).toHaveProperty('subject')
    expect(response).toHaveProperty('html')

    // Subject should be decoded and interpolated
    expect(response.subject).toBe('Welcome to Acme Corp!')

    // HTML should not contain the subject text in visible content
    expect(response.html).toContain('<!DOCTYPE html')
    expect(response.html).toContain('Acme Corp')
  })

  it('returns only HTML when no subject is defined', async () => {
    const response = await $fetch('/api/send-email', {
      method: 'POST',
      body: { name: 'NoSubject' },
    })

    // Should be a string, not an object
    expect(typeof response).toBe('string')
    expect(response).toContain('<!DOCTYPE html')
  })

  it('returns HTML using renderEmail function (alias)', async () => {
    // Test the renderEmail function which is an alias for renderEmailComponent
    const response = await $fetch('/api/render-email', {
      method: 'POST',
      body: { name: 'Test' },
    })
    expect(response).toMatchSnapshot()
  })
})
