<script setup lang="ts">
interface Props {
  isLoading: boolean
  renderedHtml: string | null
  viewportClass: string
}

defineProps<Props>()
</script>

<template>
  <div :class="viewportClass">
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
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  </div>
</template>
