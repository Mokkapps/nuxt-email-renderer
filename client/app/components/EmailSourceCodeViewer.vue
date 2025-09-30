<script setup lang="ts">
interface Props {
  sourceCode: string | null
}

defineProps<Props>()
</script>

<template>
  <NCard class="p-0">
    <div class="bg-gray-50 dark:bg-gray-800 p-4 overflow-auto">
      <pre class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono"><code>{{ sourceCode || 'Loading source code...' }}</code></pre>
    </div>
  </NCard>
</template>
