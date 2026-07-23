export const emailComponentPaths = {
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
  EPreview: 'preview/EPreview.vue',
  ERow: 'row/ERow.vue',
  ESection: 'section/ESection.vue',
  EStyle: 'style/EStyle.vue',
  ESubject: 'subject/ESubject.vue',
  EText: 'text/EText.vue',
  EMarkdown: 'markdown/EMarkdown.vue',
} as const

export type EmailComponentName = keyof typeof emailComponentPaths

export function getEnabledEmailComponentPaths(codeHighlighting: boolean) {
  if (codeHighlighting) {
    return emailComponentPaths
  }

  const { ECodeBlock: _removed, ...pathsWithoutCodeBlock } = emailComponentPaths
  return pathsWithoutCodeBlock
}
