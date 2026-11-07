import type { EmailComponentMap } from './components.d'

/**
 * Built-in email components, relative to this directory. The module registers
 * them globally in every rendered email. Keep `components.d.ts` in sync.
 */
export const emailComponentFiles = {
  EBody: 'body/EBody.vue',
  EButton: 'button/EButton.vue',
  ECodeBlock: 'code-block/ECodeBlock.vue',
  ECodeInline: 'code-inline/ECodeInline.vue',
  EColumn: 'column/EColumn.vue',
  EContainer: 'container/EContainer.vue',
  EFont: 'font/EFont.vue',
  EHead: 'head/EHead.vue',
  EHeading: 'heading/EHeading.vue',
  EHr: 'hr/EHr.vue',
  EHtml: 'html/EHtml.vue',
  EImg: 'img/EImg.vue',
  ELink: 'link/ELink.vue',
  EMarkdown: 'markdown/EMarkdown.vue',
  EPreview: 'preview/EPreview.vue',
  ERow: 'row/ERow.vue',
  ESection: 'section/ESection.vue',
  EStyle: 'style/EStyle.vue',
  ESubject: 'subject/ESubject.vue',
  EText: 'text/EText.vue',
} as const satisfies Record<keyof EmailComponentMap, string>

export type EmailComponentName = keyof typeof emailComponentFiles

export type * from './components.d'
