import { readdir, stat } from 'node:fs/promises'
import { join, basename, extname } from 'node:path'
import { existsSync } from 'node:fs'

export interface EmailTemplateInfo {
  name: string
  filename: string
  displayName: string
  importPath: string
  filePath: string
}

export interface EmailTemplateMapping {
  [templateName: string]: EmailTemplateInfo
}

/**
 * Scans the emails directory and generates template mappings
 */
export async function generateTemplateMapping(
  emailsDir: string,
): Promise<EmailTemplateMapping> {
  const mapping: EmailTemplateMapping = {}

  if (!existsSync(emailsDir)) {
    console.warn(`Email templates directory not found: ${emailsDir}`)
    return mapping
  }

  try {
    const files = await readdir(emailsDir)

    for (const file of files) {
      if (!file.endsWith('.vue')) continue

      const filePath = join(emailsDir, file)
      const fileStats = await stat(filePath)

      if (!fileStats.isFile()) continue

      const name = basename(file, extname(file))
      const displayName = name.replace(/([A-Z])/g, ' $1').trim()

      // Create a virtual import path that Nitro can resolve
      const importPath = `#email-templates/${name}`

      mapping[name] = {
        name,
        filename: file,
        displayName,
        importPath,
        filePath,
      }
    }
  }
  catch (error) {
    console.error('Error scanning email templates directory:', error)
  }

  return mapping
}

/**
 * Generates virtual module content for email templates
 */
export function generateVirtualModule(mapping: EmailTemplateMapping): string {
  const imports: string[] = []
  const exports: string[] = []
  const mappingEntries: string[] = []

  // Helper to safely escape strings for JavaScript
  const escapeString = (str: string) => JSON.stringify(str)

  Object.values(mapping).forEach((template, index) => {
    const importName = `Template${index}`
    imports.push(
      `import ${importName} from ${escapeString(template.filePath)}`,
    )
    exports.push(`  ${escapeString(template.name)}: ${importName}`)

    // Generate mapping entry as valid JavaScript object
    mappingEntries.push(`  ${escapeString(template.name)}: {
    name: ${escapeString(template.name)},
    filename: ${escapeString(template.filename)},
    displayName: ${escapeString(template.displayName)},
    importPath: ${escapeString(template.importPath)},
    filePath: ${escapeString(template.filePath)}
  }`)
  })

  // Handle empty mapping case
  const templatesContent = exports.length > 0 ? exports.join(',\n') : ''
  const mappingContent
    = mappingEntries.length > 0 ? mappingEntries.join(',\n') : ''

  return `${imports.join('\n')}

export const emailTemplates = {
${templatesContent}
}

export const emailTemplateMapping = {
${mappingContent}
}

export function getEmailTemplate(name) {
  return emailTemplates[name]
}
`
}
