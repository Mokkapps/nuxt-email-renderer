import { readdir } from 'node:fs/promises'
import { basename, join } from 'node:path'
import type { EmailTemplateInfo } from './runtime/types'

/** Turn `PasswordReset` into `Password Reset`. */
function toDisplayName(name: string) {
  return name
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    .trim()
}

/**
 * Collect the `.vue` files of every templates directory. Directories are
 * ordered by priority, so the first layer wins when names collide.
 */
export async function scanEmailTemplates(dirs: string[]): Promise<EmailTemplateInfo[]> {
  const templates = new Map<string, EmailTemplateInfo>()
  for (const dir of dirs) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      if (!entry.isFile() || !entry.name.endsWith('.vue')) continue
      const name = basename(entry.name, '.vue')
      if (templates.has(name)) continue
      templates.set(name, {
        name,
        filename: entry.name,
        displayName: toDisplayName(name),
        filePath: join(dir, entry.name),
      })
    }
  }
  return [...templates.values()]
}

/** Source of `#email-templates`: the template components and their metadata. */
export function generateTemplatesModule(templates: EmailTemplateInfo[]): string {
  const imports = templates.map((template, index) =>
    `import Template${index} from ${JSON.stringify(template.filePath)}`)
  const components = templates.map((template, index) =>
    `  ${JSON.stringify(template.name)}: Template${index},`)
  const infos = templates.map(template =>
    `  ${JSON.stringify(template.name)}: ${JSON.stringify(template)},`)

  return [
    ...imports,
    `export const emailTemplates = {\n${components.join('\n')}\n}`,
    `export const emailTemplateInfos = {\n${infos.join('\n')}\n}`,
  ].join('\n')
}

/** Source of `#email-components`: the built-in components, registered globally. */
export function generateComponentsModule(components: Record<string, string>): string {
  const entries = Object.entries(components)
  return [
    ...entries.map(([name, path]) => `import ${name} from ${JSON.stringify(path)}`),
    `export const emailComponents = { ${entries.map(([name]) => name).join(', ')} }`,
  ].join('\n')
}
