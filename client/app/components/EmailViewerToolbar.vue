<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import EmailSendButton from './EmailSendButton.vue'
import { consola } from 'consola'

interface Props {
  viewMode: 'desktop' | 'mobile'
  contentMode: 'preview' | 'source' | 'html'
  renderedHtml: string | null
  renderedSubject?: string | null
  sourceCode: string | null
}

interface Emits {
  'update:viewMode': ['desktop' | 'mobile']
  'update:contentMode': ['preview' | 'source' | 'html']
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
    value: 'html',
    label: 'HTML',
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

const onCopy = async () => {
  try {
    if (props.contentMode === 'source' && props.sourceCode) {
      await copy(props.sourceCode)
      devtoolsUiShowNotification({
        message: 'Copied source code to clipboard',
        icon: 'i-carbon-checkmark',
        classes: 'text-green',
      })
    }
    else if ((props.contentMode === 'preview' || props.contentMode === 'html') && props.renderedHtml) {
      await copy(props.renderedHtml)
      devtoolsUiShowNotification({
        message: 'Copied HTML to clipboard',
        icon: 'i-carbon-checkmark',
        classes: 'text-green',
      })
    }
  }
  catch (error) {
    consola.error('Error copying to clipboard:', error)
    devtoolsUiShowNotification({
      message: 'Failed to copy to clipboard',
      icon: 'i-carbon-warning',
      classes: 'text-red',
    })
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
          View:
        </span>
        <NSelectTabs
          v-model="currentContentMode"
          :options="contentTabs"
        />
      </div>

      <template v-if="contentMode === 'preview'">
        <div class="hidden sm:block w-px h-8 bg-gray-200 dark:bg-gray-700" />

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
      </template>
    </div>

    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <BaseButton
          v-if="contentMode === 'preview' && renderedHtml"
          icon="carbon:rotate-360"
          @click="handleRefresh"
        >
          Re-render
        </BaseButton>

        <NButton
          v-if="isSupported"
          :icon="copied ? 'carbon:checkmark-outline' : 'carbon:copy'"
          @click="onCopy"
        >
          {{ copied ? 'Copied' : 'Copy' }}
        </NButton>

        <EmailSendButton
          v-if="renderedHtml"
          :html="renderedHtml"
          :subject="renderedSubject"
        />
      </div>
    </div>
  </div>
</template>
