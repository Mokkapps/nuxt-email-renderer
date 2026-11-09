import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

describe('custom srcDir', async () => {
  await setup({
    rootDir: resolve(__dirname, './fixtures/custom-srcdir'),
  })

  it('finds templates in <srcDir>/emails', async () => {
    const { html } = await $fetch<{ html: string }>('/api/send-email', {
      method: 'POST',
      body: { name: 'SrcDirEmail' },
    })
    expect(html).toContain('Email from srcDir')
  })
})
