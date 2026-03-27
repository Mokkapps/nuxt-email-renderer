import { readFile } from 'node:fs/promises'
import { dirname, extname, isAbsolute, resolve } from 'node:path'

const INLINE_IMAGE_MIME_TYPES: Record<string, string> = {
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

/**
 * Adds `?inline` support to Nitro's Rollup build so server-side templates can import local
 * images as data URLs. Imports without `?inline` are ignored and continue through the default
 * Nitro/Rollup pipeline unchanged.
 */
export function nitroInlineAssetPlugin() {
  return {
    name: 'nitro-inline-assets',
    resolveId(source: string, importer?: string) {
      if (!source.endsWith('?inline')) {
        return null
      }

      const cleanSource = source.slice(0, -'?inline'.length)

      if (source.startsWith('.') && importer) {
        return `${resolve(dirname(importer), cleanSource)}?inline`
      }

      if (isAbsolute(cleanSource)) {
        return source
      }

      return null
    },
    async load(id: string) {
      if (!id.endsWith('?inline')) {
        return null
      }

      const filePath = id.slice(0, -'?inline'.length)
      const mimeType = INLINE_IMAGE_MIME_TYPES[extname(filePath).toLowerCase()]
      if (!mimeType) {
        return null
      }

      const bytes = await readFile(filePath)
      const dataUrl = `data:${mimeType};base64,${bytes.toString('base64')}`

      return `export default ${JSON.stringify(dataUrl)};`
    },
  }
}
