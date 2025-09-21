// Auto-export all components for server-side registration
export { default as EHtml } from './EHtml.vue'
export { default as EText } from './EText.vue'

// Export all components as a registry object for easy iteration
export const emailComponents = {
  EHtml: () => import('./EHtml.vue'),
  EText: () => import('./EText.vue'),
}
