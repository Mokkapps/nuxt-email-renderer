/**
 * Core email template interface
 */
export interface EmailTemplate {
  name: string
  filename: string
  displayName: string
}

/**
 * Template metadata, including the absolute path of its file.
 */
export interface EmailTemplateInfo extends EmailTemplate {
  filePath: string
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
