<script setup lang="ts">
import { codeToHtml } from 'shiki'

interface Props {
  sourceCode: string | null
}

const { sourceCode } = defineProps<Props>()

const html = ref(sourceCode)

watch(() => sourceCode, async (newCode) => {
  if (newCode) {
    try {
      html.value = await codeToHtml(newCode, {
        lang: 'html',
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
