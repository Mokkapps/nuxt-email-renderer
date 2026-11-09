import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { setup, $fetch, fetch, url } from '@nuxt/test-utils/e2e'
import type { RenderResult } from '../src/runtime/server/utils/render'

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
    const response = await $fetch<RenderResult>('/api/send-email', {
      method: 'POST',
      body: { name: 'Test', props: { siteName: 'Acme Corp' } },
    })

    // Subject should be decoded and interpolated
    expect(response.subject).toBe('Welcome to Acme Corp!')

    // HTML should not contain the subject text in visible content
    expect(response.html).toContain('<!DOCTYPE html')
    expect(response.html).toContain('Acme Corp')
  })

  it('returns no subject when the template has none', async () => {
    const response = await $fetch<RenderResult>('/api/send-email', {
      method: 'POST',
      body: { name: 'NoSubject' },
    })

    expect(response).toEqual({ html: expect.stringContaining('<!DOCTYPE html') })
  })

  it('renders plain text', async () => {
    const response = await $fetch<RenderResult>('/api/send-email', {
      method: 'POST',
      body: { name: 'NoSubject', options: { plainText: true } },
    })

    expect(response.html).toContain('<!DOCTYPE html')
    expect(response.text).toMatchSnapshot()
  })

  it('renders plain text together with the subject', async () => {
    const response = await $fetch<RenderResult>('/api/send-email', {
      method: 'POST',
      body: { name: 'Test', props: { siteName: 'Acme' }, options: { plainText: true } },
    })

    expect(response.subject).toBe('Welcome to Acme!')
    expect(response.text).not.toContain('<')
    expect(response.text).toContain('Get Started Now')
  })

  it('pretty-prints HTML', async () => {
    const { html } = await $fetch<RenderResult>('/api/send-email', {
      method: 'POST',
      body: { name: 'NoSubject', options: { pretty: true } },
    })

    expect(html).toMatch(/\n {2,}<body/)
  })

  it('does not register the dev API in production', async () => {
    // Without pages, unknown routes render app.vue, so check for the JSON API response.
    const response = await fetch(url('/__nuxt-email-renderer/api/templates'))
    expect(response.headers.get('content-type')).not.toContain('application/json')
  })
})
