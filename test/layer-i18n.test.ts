import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('i18n with layers', async () => {
  await setup({
    rootDir: resolve(__dirname, './fixtures/layer-i18n'),
  })

  it('renders the index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<div>Layer i18n Test</div>')
  })

  it('renders email with default locale (en) using locale files from a layer', async () => {
    const response = await $fetch('/api/send-email', {
      method: 'POST',
      body: {
        name: 'Welcome',
        props: { name: 'John' },
      },
    })

    expect(response).toContain('Welcome')
    expect(response).toContain('Hello, John!')
    expect(response).toContain('This is a test email')
    expect(response).toContain('Click here')
  })

  it('renders email with German locale (de) using locale files from a layer', async () => {
    const response = await $fetch('/api/send-email', {
      method: 'POST',
      body: {
        name: 'Welcome',
        locale: 'de',
        props: { name: 'Hans' },
      },
    })

    expect(response).toContain('Willkommen')
    expect(response).toContain('Hallo, Hans!')
    expect(response).toContain('Dies ist eine Test-E-Mail')
    expect(response).toContain('Hier klicken')
  })

  it('$t is always a function even when locale files are used', async () => {
    // Should not throw "_ctx.$t is not a function"
    await expect(
      $fetch('/api/send-email', {
        method: 'POST',
        body: {
          name: 'Welcome',
          props: { name: 'Test' },
        },
      }),
    ).resolves.toBeTruthy()
  })
})
