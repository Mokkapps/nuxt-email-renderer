import { type BundledLanguage, type BundledTheme, getSingletonHighlighter, type HighlighterGeneric } from 'shiki'
import { consola } from 'consola'

const highlighter = ref<HighlighterGeneric<BundledLanguage, BundledTheme> | undefined>()

export const useShiki = () => {
  if (!highlighter.value) {
    getSingletonHighlighter({
      themes: ['vitesse-dark'],
      langs: ['html', 'vue'],
    }).then((_highlighter) => {
      highlighter.value = _highlighter
    }).catch((error) => {
      consola.error('Error creating highlighter', error)
    })
  }

  return {
    highlighter,
  }
}
