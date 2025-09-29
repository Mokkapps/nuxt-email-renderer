<script setup lang="ts">
import type { Component } from 'vue'
import { useClipboard } from '@vueuse/core'

interface EmailTemplate {
  name: string
  displayName: string
  filename: string
  description: string
  component: Component
}

interface SourceResponse {
  filename: string
  filePath: string
  sourceCode: string
}

interface Props {
  template: EmailTemplate | null
}

const props = defineProps<Props>()

const viewMode = ref<'desktop' | 'mobile'>('desktop')
const contentMode = ref<'preview' | 'source'>('preview')
const renderedHtml = ref('')
const sourceCode = ref('')
const isLoading = ref(false)

const url = useRequestURL()
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

const renderTemplate = async (template: EmailTemplate) => {
  isLoading.value = true
  try {
    // Render the email template to HTML
    renderedHtml.value = await $fetch(`${url.origin}/api/emails/render`, {
      method: 'POST',
      body: {
        name: template.filename,
      },
    })

    // Load source code from the API
    try {
      const sourceResponse = (await $fetch(`${url.origin}/api/emails/source`, {
        method: 'POST',
        body: {
          name: template.filename,
        },
      })) as SourceResponse
      sourceCode.value = sourceResponse.sourceCode
    }
    catch (sourceError) {
      console.error('Failed to load source code:', sourceError)
      const errorMessage
        = sourceError instanceof Error ? sourceError.message : 'Unknown error'
      sourceCode.value = `// Failed to load source code for ${template.filename}\n// Error: ${errorMessage}`
    }
  }
  catch (error) {
    console.error('Failed to render template:', error)
    const errorMessage
      = error instanceof Error ? error.message : 'Unknown error'
    renderedHtml.value = '<div>Failed to render template</div>'
    sourceCode.value = `// Failed to load source code due to template render error\n// Error: ${errorMessage}`
  }
  finally {
    isLoading.value = false
  }
}

const refreshTemplate = async () => {
  if (props.template) {
    await renderTemplate(props.template)
  }
}

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

// Watch for template changes and render the email
watch(
  () => props.template,
  async (newTemplate: EmailTemplate | null) => {
    if (newTemplate) {
      await renderTemplate(newTemplate)
    }
    else {
      renderedHtml.value = ''
      sourceCode.value = ''
    }
  },
  { immediate: true },
)

const viewportClass = computed(() => {
  return viewMode.value === 'mobile'
    ? 'max-w-[375px] mx-auto'
    : 'max-w-[800px] mx-auto'
})

const iframeContent = computed(() => {
  if (!renderedHtml.value) return ''

  // Wrap the rendered HTML in a complete HTML document
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; }
  </style>
</head>
<body>
  ${renderedHtml.value}
</body>
</html>`
})
</script>

<template>
  <div
    v-if="!template"
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
    <NCard class="p-4">
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <!-- Left Side: Template Info & Viewport Controls -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-4">
          <!-- Template Info -->
          <div class="flex items-center gap-3">
            <div>
              <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                {{ template.displayName }}
              </h3>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ template.filename }}
              </p>
            </div>
          </div>

          <!-- Divider -->
          <div
            class="hidden sm:block w-px h-8 bg-gray-200 dark:bg-gray-700"
          />

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
              @click="refreshTemplate"
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
    </NCard>

    <!-- Content Area -->
    <div class="space-y-4">
      <!-- Preview Content -->
      <div v-if="contentMode === 'preview'">
        <NCard class="p-4">
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
                :srcdoc="iframeContent"
                class="w-full min-h-[500px] border-0"
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
        </NCard>
      </div>

      <!-- Source Code Content -->
      <div v-else-if="contentMode === 'source'">
        <NCard class="p-0">
          <div
            class="bg-gray-50 dark:bg-gray-800 p-4 max-h-[600px] overflow-auto"
          >
            <pre
              class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono"
            ><code>{{ sourceCode || 'Loading source code...' }}</code></pre>
          </div>
        </NCard>
      </div>
    </div>
  </div>
</template>
