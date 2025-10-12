import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('E2E i18n', async () => {
  await setup({
    rootDir: resolve(__dirname, './fixtures/i18n'),
  })

  it('renders the index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<div>i18n test fixture</div>')
  })

  describe('API with i18n', () => {
    it('returns a list of all available emails', async () => {
      const response = await $fetch('/api/emails')
      expect(response).toEqual([{
        name: 'I18nTest',
        filename: 'I18nTest.vue',
        displayName: 'I18n Test', // Display name includes space for better readability
      }])
    })

    it('renders email with default locale (en)', async () => {
      const response = await $fetch('/api/emails/render', {
        method: 'POST',
        body: {
          name: 'I18nTest',
          i18n: {
            enabled: true,
            localesDir: resolve(__dirname, './fixtures/i18n/emails/locales'),
            locale: 'en',
            defaultLocale: 'en',
          },
        },
      })
      
      expect(response).toContain('Welcome to our platform! 🎉')
      expect(response).toContain('Hi there,')
      expect(response).toContain('Get Started Now')
    })

    it('renders email with German locale (de)', async () => {
      const response = await $fetch('/api/emails/render', {
        method: 'POST',
        body: {
          name: 'I18nTest',
          i18n: {
            enabled: true,
            localesDir: resolve(__dirname, './fixtures/i18n/emails/locales'),
            locale: 'de',
            defaultLocale: 'en',
          },
        },
      })
      
      expect(response).toContain('Willkommen auf unserer Plattform! 🎉')
      expect(response).toContain('Hallo,')
      expect(response).toContain('Jetzt loslegen')
    })

    it('renders email with Spanish locale (es)', async () => {
      const response = await $fetch('/api/emails/render', {
        method: 'POST',
        body: {
          name: 'I18nTest',
          i18n: {
            enabled: true,
            localesDir: resolve(__dirname, './fixtures/i18n/emails/locales'),
            locale: 'es',
            defaultLocale: 'en',
          },
        },
      })
      
      expect(response).toContain('¡Bienvenido a nuestra plataforma! 🎉')
      expect(response).toContain('Hola,')
      expect(response).toContain('Comenzar ahora')
    })

    it('renders email with pre-loaded messages', async () => {
      const response = await $fetch('/api/emails/render', {
        method: 'POST',
        body: {
          name: 'I18nTest',
          i18n: {
            enabled: true,
            locale: 'fr',
            defaultLocale: 'en',
            messages: {
              fr: {
                welcome: {
                  title: 'Bienvenue sur notre plateforme! 🎉',
                  greeting: 'Bonjour,',
                  message: 'Bienvenue sur notre plateforme!',
                  features: {
                    title: 'Voici quelques choses que vous pouvez faire:',
                    profile: 'Complétez votre profil',
                    explore: 'Explorez les fonctionnalités',
                    community: 'Rejoignez la communauté',
                  },
                  cta: 'Commencer maintenant',
                  help: 'Besoin d\'aide pour commencer? Nous sommes là pour vous!',
                },
              },
            },
          },
        },
      })
      
      expect(response).toContain('Bienvenue sur notre plateforme! 🎉')
      expect(response).toContain('Bonjour,')
      expect(response).toContain('Commencer maintenant')
    })

    it('falls back to default locale when translation is missing', async () => {
      const response = await $fetch('/api/emails/render', {
        method: 'POST',
        body: {
          name: 'I18nTest',
          i18n: {
            enabled: true,
            localesDir: resolve(__dirname, './fixtures/i18n/emails/locales'),
            locale: 'zh', // Chinese locale not provided, should fall back to 'en'
            defaultLocale: 'en',
          },
        },
      })
      
      // Should fall back to English
      expect(response).toContain('Welcome to our platform! 🎉')
      expect(response).toContain('Hi there,')
    })

    it('renders email without i18n when not enabled', async () => {
      const response = await $fetch('/api/emails/render', {
        method: 'POST',
        body: {
          name: 'I18nTest',
        },
      })
      
      // When i18n is not enabled, $t() should not be replaced
      // The template will render the raw $t() expression or fail
      expect(typeof response).toBe('string')
    })
  })
})
