<script setup lang="ts">
interface Props {
  renderedHtml: string | null
  renderedSubject?: string | null
  viewMode: 'desktop' | 'mobile'
}

const props = defineProps<Props>()

const viewportClass = computed(() => {
  return props.viewMode === 'mobile'
    ? 'max-w-[375px] mx-auto'
    : 'max-w-[800px] mx-auto'
})
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <div
      v-if="renderedSubject"
      class="px-4 py-2 border border-b-0 rounded-t-lg bg-gray-50 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300"
    >
      <span class="font-semibold">Subject:</span> {{ renderedSubject }}
    </div>
    <div
      class="border rounded-lg overflow-hidden bg-white shadow-sm"
      :class="{ 'rounded-t-none': renderedSubject }"
    >
      <iframe
        v-if="renderedHtml"
        :srcdoc="renderedHtml"
        class="w-full h-screen border-0"
        :class="viewportClass"
        width="100%"
        height="100%"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  </div>
</template>
