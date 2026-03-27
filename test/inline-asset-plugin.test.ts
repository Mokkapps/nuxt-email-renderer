import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'
import { nitroInlineAssetPlugin } from '../src/inline-asset-plugin'

describe('nitroInlineAssetPlugin', async () => {
  await setup({
    rootDir: resolve(__dirname, './fixtures/inline-asset'),
  })

  const plugin = nitroInlineAssetPlugin()

  describe('resolveId', () => {
    it('ignores imports without ?inline', () => {
      expect(plugin.resolveId('./logo.svg')).toBeNull()
      expect(plugin.resolveId('./logo.svg', '/some/importer.ts')).toBeNull()
      expect(plugin.resolveId('/abs/logo.svg')).toBeNull()
    })

    it('resolves relative ?inline imports against the importer directory', () => {
      expect(plugin.resolveId('./assets/logo.svg?inline', '/some/dir/importer.ts'))
        .toBe('/some/dir/assets/logo.svg?inline')
    })

    it('returns null for relative ?inline import without an importer', () => {
      expect(plugin.resolveId('./assets/logo.svg?inline')).toBeNull()
    })

    it('passes through absolute ?inline imports unchanged', () => {
      expect(plugin.resolveId('/abs/logo.svg?inline'))
        .toBe('/abs/logo.svg?inline')
    })

    it('returns null for non-relative, non-absolute source with ?inline', () => {
      expect(plugin.resolveId('logo.svg?inline')).toBeNull()
      expect(plugin.resolveId('some-package/logo.svg?inline')).toBeNull()
      expect(plugin.resolveId('logo.svg?inline', '/some/importer.ts')).toBeNull()
    })
  })

  describe('load', () => {
    it('ignores ids without ?inline', async () => {
      expect(await plugin.load('/some/file.svg')).toBeNull()
    })

    it('returns null for unsupported file extensions', async () => {
      expect(await plugin.load('/some/file.txt?inline')).toBeNull()
      expect(await plugin.load('/some/file.pdf?inline')).toBeNull()
      expect(await plugin.load('/some/file.html?inline')).toBeNull()
    })

    it('returns a base64 data URL module for a supported file', async () => {
      const svgPath = resolve(__dirname, 'fixtures/inline-asset/emails/assets/logo.svg')
      const result = await plugin.load(`${svgPath}?inline`)

      expect(result).toContain('export default "data:image/svg+xml;base64,')
      expect(result).toMatch(/";$/)
    })
  })

  it('inlines supported local assets imported with ?inline in rendered email', async () => {
    const response = await $fetch('/api/send-email', {
      method: 'POST',
      body: { name: 'InlineAsset' },
    })

    expect(typeof response).toBe('string')
    expect(response).toContain('<!DOCTYPE html')
    expect(response).toContain('data:image/svg+xml;base64,')
    expect(response).toContain('alt="Inline Logo"')
  })
})
