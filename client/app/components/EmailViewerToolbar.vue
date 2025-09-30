<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

interface Props {
  viewMode: 'desktop' | 'mobile'
  contentMode: 'preview' | 'source'
  isLoading: boolean
  renderedHtml: string | null
  sourceCode: string | null
}

interface Emits {
  'update:viewMode': ['desktop' | 'mobile']
  'update:contentMode': ['preview' | 'source']
  'refresh': []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const viewportTabs = [
  {
    value: 'desktop',
    label: 'Desktop',
  },
  {
    value: 'mobile',
    label: 'Mobile',
  },
]

const contentTabs = [
  {
    value: 'preview',
    label: 'Preview',
  },
  {
    value: 'source',
    label: 'Source Code',
  },
]

const currentViewMode = computed({
  get: () => props.viewMode,
  set: value => emit('update:viewMode', value),
})

const currentContentMode = computed({
  get: () => props.contentMode,
  set: value => emit('update:contentMode', value),
})

const { copy, copied, isSupported } = useClipboard()

const copySourceCode = async () => {
  if (isSupported && props.sourceCode) {
    await copy(props.sourceCode)
  }
}

const copyRenderedHtml = async () => {
  if (isSupported && props.renderedHtml) {
    await copy(props.renderedHtml)
  }
}

const handleRefresh = () => {
  emit('refresh')
}
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div class="flex flex-col sm:flex-row sm:items-center gap-4">
      <div class="flex items-center gap-3">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
          Viewport:
        </span>
        <NSelectTabs
          v-model="currentViewMode"
          :options="viewportTabs"
        />
        <NBadge class="hidden sm:inline-flex">
          {{ viewMode === "desktop" ? "800px" : "375px" }}
        </NBadge>
      </div>

      <div class="hidden sm:block w-px h-8 bg-gray-200 dark:bg-gray-700" />

      <div class="flex items-center gap-3">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
          View:
        </span>
        <NSelectTabs
          v-model="currentContentMode"
          :options="contentTabs"
        />
      </div>
    </div>

    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <NButton
          v-if="contentMode === 'preview' && renderedHtml"
          icon="carbon:update-now"
          :disabled="isLoading"
          @click="handleRefresh"
        >
          Refresh
        </NButton>

        <NButton
          v-if="contentMode === 'preview' && renderedHtml && isSupported"
          :icon="copied ? 'carbon:checkmark-outline' : 'carbon:copy'"
          @click="copyRenderedHtml"
        >
          {{ copied ? 'Copied' : 'Copy' }}
        </NButton>

        <NButton
          v-if="contentMode === 'source' && sourceCode && isSupported"
          :icon="copied ? 'carbon:checkmark-outline' : 'carbon:copy'"
          @click="copySourceCode"
        >
          {{ copied ? 'Copied' : 'Copy' }}
        </NButton>
      </div>
    </div>
  </div>
</template>
