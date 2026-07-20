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
})
