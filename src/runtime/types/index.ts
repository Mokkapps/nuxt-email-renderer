/**
 * Core email template interface
 */
export interface EmailTemplate {
  name: string
  filename: string
  displayName: string
}

/**
 * Extended email template information with additional metadata
 */
export interface EmailTemplateInfo extends EmailTemplate {
  importPath: string
  filePath: string
}

/**
 * Mapping of template names to template information
 */
export interface EmailTemplateMapping {
  [templateName: string]: EmailTemplateInfo
}
