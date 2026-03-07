import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('i18n support', async () => {
  await setup({
    rootDir: resolve(__dirname, './fixtures/i18n'),
  })

  it('renders email with default locale (en)', async () => {
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

  it('renders email with German locale (de)', async () => {
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

  it('renders email with Spanish locale (es)', async () => {
    const response = await $fetch('/api/send-email', {
      method: 'POST',
      body: {
        name: 'Welcome',
        locale: 'es',
        props: { name: 'Juan' },
      },
    })

    expect(response).toContain('Bienvenido')
    expect(response).toContain('¡Hola, Juan!')
    expect(response).toContain('Este es un correo electrónico de prueba')
    expect(response).toContain('Haz clic aquí')
  })

  it('falls back to default locale when invalid locale is provided', async () => {
    const response = await $fetch('/api/send-email', {
      method: 'POST',
      body: {
        name: 'Welcome',
        locale: 'invalid',
        props: { name: 'Test' },
      },
    })

    // Should fall back to English
    expect(response).toContain('Welcome')
    expect(response).toContain('Hello, Test!')
  })
})
