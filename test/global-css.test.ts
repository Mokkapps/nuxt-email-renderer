import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('globalCss', async () => {
  await setup({
    rootDir: resolve(__dirname, './fixtures/global-css'),
  })

  it('renders the index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<div>global-css</div>')
  })

  it('injects global CSS variables into email head', async () => {
    const response = await $fetch('/api/send-email', {
      method: 'POST',
      body: { name: 'GlobalCss' },
    })

    expect(typeof response).toBe('string')
    expect(response).toContain('<!DOCTYPE html')
    expect(response).toContain('--color-primary: #3b82f6')
    expect(response).toContain('--color-text: #1f2937')
    expect(response).toContain('data-id="__nuxt-email-global-style"')
  })

  it('places global CSS inside <head>', async () => {
    const response = await $fetch('/api/send-email', {
      method: 'POST',
      body: { name: 'GlobalCss' },
    }) as string

    const headEnd = response.indexOf('</head>')
    const globalStyleStart = response.indexOf('__nuxt-email-global-style')

    expect(headEnd).toBeGreaterThan(-1)
    expect(globalStyleStart).toBeGreaterThan(-1)
    expect(globalStyleStart).toBeLessThan(headEnd)
  })
})
