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

/**
 * Context passed to the DevTools preview props hook.
 */
export interface DevtoolsPreviewPropsContext {
  /**
   * Normalized template name without the `.vue` extension.
   */
  templateName: string
  /**
   * Full props object passed to the template renderer.
   * Hook handlers can mutate or replace this object.
   */
  props: Record<string, unknown>
}
