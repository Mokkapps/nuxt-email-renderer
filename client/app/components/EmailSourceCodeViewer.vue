<script setup lang="ts">
import { useShiki } from '~/composables/useShiki'

interface Props {
  sourceCode: string | null
  contentMode: 'html' | 'source'
}

const { sourceCode, contentMode } = defineProps<Props>()

const { highlighter } = useShiki()

const html = ref(sourceCode)

watch([() => sourceCode, highlighter], async ([newCode, newHighlighter]) => {
  if (!newHighlighter) {
    html.value = sourceCode
    return
  }
  if (newCode) {
    try {
      html.value = await newHighlighter.codeToHtml(newCode, {
        lang: contentMode === 'source' ? 'html' : 'html',
        theme: 'vitesse-dark',
      })
    }
    catch {
      html.value = sourceCode
    }
  }
  else {
    html.value = 'Missing source code'
  }
}, { immediate: true })
</script>

<template>
  <NCard class="p-4 overflow-auto max-h-full">
    <div
      v-html="html"
    />
  </NCard>
</template>
