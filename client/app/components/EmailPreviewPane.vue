<script setup lang="ts">
interface Props {
  renderedHtml: string | null
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
  <div>
    <div class="border rounded-lg overflow-hidden bg-white shadow-sm">
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
