import { readdir, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { $fetch, setup, useTestContext } from '@nuxt/test-utils/e2e'

async function readAllFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { recursive: true, withFileTypes: true })
  return Promise.all(entries
    .filter(entry => entry.isFile() && /\.m?js$/.test(entry.name))
    .map(entry => readFile(join(entry.parentPath, entry.name), 'utf8')))
}

describe('codeHighlighting: false', async () => {
  await setup({
    rootDir: resolve(__dirname, './fixtures/code-highlighting-disabled'),
  })

  it('does not register ECodeBlock', async () => {
    const html = await $fetch<string>('/api/send-email')
    expect(html).toContain('Before code')
    // Unregistered components render as plain elements instead of highlighted code.
    expect(html).not.toContain('<pre')
  })

  it('keeps Shiki out of the server bundle', async () => {
    const outputDir = useTestContext().nuxt!.options.nitro.output!.dir!
    const files = await readAllFiles(join(outputDir, 'server/chunks'))
    expect(files.length).toBeGreaterThan(0)
    expect(files.some(content => content.includes('createHighlighterCore'))).toBe(false)
    expect(existsSync(join(outputDir, 'server/node_modules/shiki'))).toBe(false)
  })
})
