// Auto-generated component type declarations for nuxt-email-renderer

// Export individual component types
export type EBody = typeof import('./body/EBody.vue').default
export type EButton = typeof import('./button/EButton.vue').default
export type ECodeBlock = typeof import('./code-block/ECodeBlock.vue').default
export type ECodeInline
  = typeof import('./code-inline/ECodeInline.vue').default
export type EColumn = typeof import('./column/EColumn.vue').default
export type EContainer = typeof import('./container/EContainer.vue').default
export type EFont = typeof import('./font/EFont.vue').default
export type EHead = typeof import('./head/EHead.vue').default
export type EHeading = typeof import('./heading/EHeading.vue').default
export type EHr = typeof import('./hr/EHr.vue').default
export type EHtml = typeof import('./html/EHtml.vue').default
export type EImg = typeof import('./img/EImg.vue').default
export type ELink = typeof import('./link/ELink.vue').default
export type EMarkdown = typeof import('./markdown/EMarkdown.vue').default
export type EPreview = typeof import('./preview/EPreview.vue').default
export type ERow = typeof import('./row/ERow.vue').default
export type ESection = typeof import('./section/ESection.vue').default
export type EStyle = typeof import('./style/EStyle.vue').default
export type EText = typeof import('./text/EText.vue').default

// Component map for global registration
export interface EmailComponentMap {
  EBody: typeof import('./body/EBody.vue').default
  EButton: typeof import('./button/EButton.vue').default
  ECodeBlock: typeof import('./code-block/ECodeBlock.vue').default
  ECodeInline: typeof import('./code-inline/ECodeInline.vue').default
  EColumn: typeof import('./column/EColumn.vue').default
  EContainer: typeof import('./container/EContainer.vue').default
  EFont: typeof import('./font/EFont.vue').default
  EHead: typeof import('./head/EHead.vue').default
  EHeading: typeof import('./heading/EHeading.vue').default
  EHr: typeof import('./hr/EHr.vue').default
  EHtml: typeof import('./html/EHtml.vue').default
  EImg: typeof import('./img/EImg.vue').default
  ELink: typeof import('./link/ELink.vue').default
  EMarkdown: typeof import('./markdown/EMarkdown.vue').default
  EPreview: typeof import('./preview/EPreview.vue').default
  ERow: typeof import('./row/ERow.vue').default
  ESection: typeof import('./section/ESection.vue').default
  EStyle: typeof import('./style/EStyle.vue').default
  EText: typeof import('./text/EText.vue').default
}

// Augment Vue's GlobalComponents interface
declare module 'vue' {
  export interface GlobalComponents extends EmailComponentMap {}
}

// Augment @vue/runtime-core for Vue 3
declare module '@vue/runtime-core' {
  export interface GlobalComponents extends EmailComponentMap {}
}

export {}
