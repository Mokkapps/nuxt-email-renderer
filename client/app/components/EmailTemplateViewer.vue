<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

interface Props {
  template: EmailTemplate | null
}

const props = defineProps<Props>()

const viewMode = ref<'desktop' | 'mobile'>('desktop')
const contentMode = ref<'preview' | 'source'>('preview')

const url = useRequestURL()

const { data, error, pending: isLoading, refresh } = useAsyncData(async () => {
  if (!props.template) {
    return {
      html: null,
      sourceCode: null,
    }
  }
  const html = await $fetch(`${url.origin}/api/emails/render`, {
    method: 'POST',
    body: {
      name: props.template.filename,
    },
  })

  const sourceResponse = await $fetch(`${url.origin}/api/emails/source`, {
    method: 'POST',
    body: {
      name: props.template.filename,
    },
  })
  const sourceCode = sourceResponse.sourceCode

  return { html, sourceCode }
}, { watch: [() => props.template] })

const sourceCode = computed(() => data.value?.sourceCode ?? null)
const renderedHtml = computed(() => data.value?.html ?? null)

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

const viewportClass = computed(() => {
  return viewMode.value === 'mobile'
    ? 'max-w-[375px] mx-auto'
    : 'max-w-[800px] mx-auto'
})

const { copy, copied, isSupported } = useClipboard({ source: sourceCode })

const copySourceCode = async () => {
  if (isSupported && sourceCode.value) {
    await copy(sourceCode.value)
  }
}

const copyRenderedHtml = async () => {
  if (isSupported && renderedHtml.value) {
    await copy(renderedHtml.value)
  }
}
</script>

<template>
  <div class="space-y-2">
    <div class="flex items-center gap-2">
      <NIconTitle
        :text="template?.displayName ?? 'Please select a template'"
        icon="carbon:email"
      />
      <NBadge
        v-if="template"
      >
        {{ template.filename }}
      </NBadge>
    </div>

    <div
      v-if="error"
      class="flex flex-col"
    >
      <NTip
        n="red6 dark:red5"
        icon="carbon:warning-alt"
      >
        Error!
      </NTip>
      <NTip
        n="red6 dark:red5"
      >
        {{ error }}
      </NTip>
    </div>

    <div
      v-else-if="!template"
      class="flex items-center justify-center h-64"
    >
      <div class="text-center">
        <UIcon
          name="i-heroicons-inbox"
          class="w-12 h-12 text-gray-400 mx-auto mb-4"
        />
        <p class="text-gray-500 dark:text-gray-400">
          Select an email template to preview
        </p>
      </div>
    </div>

    <div
      v-else
      class="space-y-6"
    >
      <!-- Controls -->
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <!-- Left Side: Template Info & Viewport Controls -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-4">
          <!-- Viewport Controls -->
          <div class="flex items-center gap-3">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Viewport:
            </span>
            <NSelectTabs
              v-model="viewMode"
              :options="viewportTabs"
            />
            <NBadge
              class="hidden sm:inline-flex"
            >
              {{ viewMode === "desktop" ? "800px" : "375px" }}
            </NBadge>
          </div>

          <!-- Divider -->
          <div
            class="hidden sm:block w-px h-8 bg-gray-200 dark:bg-gray-700"
          />

          <!-- Content Mode Tabs -->
          <div class="flex items-center gap-3">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              View:
            </span>
            <NSelectTabs
              v-model="contentMode"
              :options="contentTabs"
            />
          </div>
        </div>

        <!-- Right Side: Content Mode & Actions -->
        <div class="flex items-center gap-4">
          <!-- Action Buttons -->
          <div class="flex items-center gap-2">
            <!-- Refresh Button -->
            <NButton
              v-if="contentMode === 'preview' && renderedHtml"
              icon="carbon:update-now"
              :disabled="isLoading"
              @click="refresh"
            >
              Refresh
            </NButton>

            <!-- Copy HTML -->
            <NButton
              v-if="contentMode === 'preview' && renderedHtml && isSupported"
              :icon="
                copied ? 'carbon:checkmark-outline' : 'carbon:copy'
              "
              @click="copyRenderedHtml"
            >
              {{ copied ? 'Copied' : 'Copy' }}
            </NButton>
            <NButton
              v-if="contentMode === 'source' && sourceCode && isSupported"
              :icon="
                copied ? 'carbon:checkmark-outline' : 'carbon:copy'
              "
              @click="copySourceCode"
            >
              {{ copied ? 'Copied' : 'Copy' }}
            </NButton>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="space-y-4">
        <!-- Preview Content -->
        <div v-if="contentMode === 'preview'">
          <div :class="viewportClass">
            <div class="border rounded-lg overflow-hidden bg-white shadow-sm">
              <!-- Loading State -->
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

              <!-- Email Template Preview -->
              <iframe
                v-else-if="renderedHtml"
                :srcdoc="renderedHtml"
                class="w-full h-screen border-0"
                sandbox="allow-same-origin"
              />

              <!-- Error State -->
              <div
                v-else
                class="flex items-center justify-center h-64"
              >
                <div class="text-center">
                  <UIcon
                    name="i-heroicons-exclamation-triangle"
                    class="w-8 h-8 text-yellow-500 mx-auto mb-2"
                  />
                  <p class="text-sm text-gray-500">
                    Failed to render template
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Source Code Content -->
        <div v-else-if="contentMode === 'source'">
          <NCard class="p-0">
            <div
              class="bg-gray-50 dark:bg-gray-800 p-4 overflow-auto"
            >
              <pre
                class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono"
              ><code>{{ sourceCode || 'Loading source code...' }}</code></pre>
            </div>
          </NCard>
        </div>
      </div>
    </div>
  </div>
</template>
