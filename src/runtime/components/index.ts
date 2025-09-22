// Auto-export all components for server-side registration
export { default as EHtml } from './html/EHtml.vue'
export { default as EText } from './text/EText.vue'
export { default as EBody } from './body/EBody.vue'
export { default as EButton } from './button/EButton.vue'
export { default as EColumn } from './column/EColumn.vue'
export { default as ECodeBlock } from './code-block/ECodeBlock.vue'
export { default as EContainer } from './container/EContainer.vue'
export { default as EFont } from './font/EFont.vue'
export { default as EHead } from './head/EHead.vue'
export { default as EHeading } from './heading/EHeading.vue'
export { default as EHr } from './hr/EHr.vue'
export { default as EImg } from './img/EImg.vue'
export { default as ELink } from './link/ELink.vue'
export { default as EPreview } from './preview/EPreview.vue'
export { default as ERow } from './row/ERow.vue'
export { default as ESection } from './section/ESection.vue'
export { default as EStyle } from './style/EStyle.vue'
export { default as ECodeInline } from './code-inline/ECodeInline.vue'

// Export all components as a registry object for easy iteration
export const emailComponents = {
  EBody: () => import('./body/EBody.vue'),
  EButton: () => import('./button/EButton.vue'),
  ECodeBlock: () => import('./code-block/ECodeBlock.vue'),
  ECodeInline: () => import('./code-inline/ECodeInline.vue'),
  EColumn: () => import('./column/EColumn.vue'),
  EContainer: () => import('./container/EContainer.vue'),
  EFont: () => import('./font/EFont.vue'),
  EHead: () => import('./head/EHead.vue'),
  EHeading: () => import('./heading/EHeading.vue'),
  EHr: () => import('./hr/EHr.vue'),
  EHtml: () => import('./html/EHtml.vue'),
  EImg: () => import('./img/EImg.vue'),
  ELink: () => import('./link/ELink.vue'),
  EPreview: () => import('./preview/EPreview.vue'),
  ERow: () => import('./row/ERow.vue'),
  ESection: () => import('./section/ESection.vue'),
  EStyle: () => import('./style/EStyle.vue'),
  EText: () => import('./text/EText.vue'),
}
