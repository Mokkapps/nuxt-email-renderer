import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import type { Nuxt } from '@nuxt/schema'
import { expect, it } from 'vitest'
import { loadI18nConfig } from '../src/i18n'

it('loads typed locale imports and merges files across layers', async () => {
  const root = await mkdtemp(join(tmpdir(), 'email-locales-'))
  try {
    for (const layer of ['app', 'base']) {
      await mkdir(join(root, layer, 'i18n/locales'), { recursive: true })
    }
    const appDir = join(root, 'app/i18n/locales')
    await writeFile(join(appDir, 'schema.ts'), 'export interface Messages { title: string }')
    await writeFile(join(appDir, 'de.ts'), "import type { Messages } from './schema'; export default { title: 'Hallo' } satisfies Messages")
    await writeFile(join(root, 'base/i18n/locales/de.ts'), "export default { title: 'Base', inherited: 'Layer' }")
    await writeFile(join(appDir, 'extra.json'), '{"extra":"JSON"}')
    const nuxt = { options: {
      i18n: { locales: [{ code: 'de', files: ['de.ts', 'extra.json'] }] },
      _layers: ['app', 'base'].map(layer => ({ cwd: join(root, layer) })),
    } } as unknown as Nuxt
    expect((await loadI18nConfig(nuxt))?.messages.de).toEqual({ title: 'Hallo', inherited: 'Layer', extra: 'JSON' })
    await writeFile(join(appDir, 'de.ts'), 'export default () => ({ title: "Unsupported" })')
    expect((await loadI18nConfig(nuxt))?.messages.de).toEqual({ title: 'Base', inherited: 'Layer', extra: 'JSON' })
  }
  finally {
    await rm(root, { recursive: true, force: true })
  }
})
