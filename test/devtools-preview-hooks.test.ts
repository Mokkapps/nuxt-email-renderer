import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

describe('devtools preview hooks', async () => {
  await setup({
    rootDir: resolve(__dirname, './fixtures/basic'),
    dev: true,
  })

  it('allows resolving dynamic template props via Nitro hook', async () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString()
    const response = await $fetch('/api/emails/render', {
      method: 'POST',
      body: {
        name: 'Test',
        props: {
          verificationCode: randomCode,
        },
      },
    }) as { html: string, subject: string }

    expect(response.subject).toBe('Welcome to AWS!')
    expect(response.html).toContain(`Verify your account: ${randomCode}`)
  })

  it('lists the email templates', async () => {
    const templates = await $fetch('/api/emails')
    expect(templates).toEqual([
      { name: 'NoSubject', filename: 'NoSubject.vue', displayName: 'No Subject' },
      { name: 'Test', filename: 'Test.vue', displayName: 'Test' },
    ])
  })

  it('returns the source of a template', async () => {
    const response = await $fetch<{ filename: string, sourceCode: string }>('/api/emails/source', {
      method: 'POST',
      body: { name: 'Test' },
    })
    expect(response.filename).toBe('Test.vue')
    expect(response.sourceCode).toContain('<ESubject>Welcome to {{ siteName }}!</ESubject>')
  })

  it('returns 404 for the source of an unknown template', async () => {
    await expect($fetch('/api/emails/source', {
      method: 'POST',
      body: { name: 'DoesNotExist' },
    })).rejects.toMatchObject({ statusCode: 404 })
  })
})
