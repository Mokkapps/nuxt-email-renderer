import type { Component } from 'vue'
import type { EmailTemplateInfo } from './virtual-templates'

// This will be replaced by the virtual module at build time
let emailTemplates: Record<string, Component> = {}
let emailTemplateMapping: Record<string, EmailTemplateInfo> = {}

// Dynamic import fallback for development or when virtual module isn't available
async function initializeTemplates() {
  try {
    const virtualModule = await import('#email-templates')
    emailTemplates = virtualModule.emailTemplates
    emailTemplateMapping = virtualModule.emailTemplateMapping
  }
  catch {
    console.warn(
      '[nuxt-email-renderer] Virtual email templates module not found, using fallback',
    )
  }
}

// Initialize templates on first use
let initialized = false
async function ensureInitialized() {
  if (!initialized) {
    await initializeTemplates()
    initialized = true
  }
}

/**
 * Get an email template component by name
 */
export async function getEmailTemplate(
  templateName: string,
): Promise<Component | null> {
  await ensureInitialized()

  const template = emailTemplates[templateName]
  if (!template) {
    console.warn(`[nuxt-email-renderer] Template "${templateName}" not found`)
    return null
  }

  return template
}

/**
 * Get template metadata by name
 */
export async function getEmailTemplateInfo(
  templateName: string,
): Promise<EmailTemplateInfo | null> {
  await ensureInitialized()

  return emailTemplateMapping[templateName] || null
}

/**
 * Get all available email templates
 */
export async function getAllEmailTemplates(): Promise<EmailTemplateInfo[]> {
  await ensureInitialized()

  return Object.values(emailTemplateMapping)
}

/**
 * Check if a template exists
 */
export async function hasEmailTemplate(templateName: string): Promise<boolean> {
  await ensureInitialized()

  return templateName in emailTemplates
}
