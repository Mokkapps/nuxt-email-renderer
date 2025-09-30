<script setup lang="ts">
interface Props {
  isLoading: boolean
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
      <div
        v-if="isLoading"
        class="flex items-center justify-center h-64"
      >
        <div class="text-center">
          <UIcon
            name="i-heroicons-arrow-path"
            class="w-8 h-8 text-blue-500 mx-auto mb-2 animate-spin"
          />
          <p class="text-sm text-gray-500">
            Rendering template...
          </p>
        </div>
      </div>

      <iframe
        v-else-if="renderedHtml"
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
