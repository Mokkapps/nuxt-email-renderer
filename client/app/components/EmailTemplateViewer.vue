<script setup lang="ts">
import type { Component } from 'vue'
import type { TabsItem } from '@nuxt/ui'
import { useClipboard } from '@vueuse/core'

interface EmailTemplate {
  name: string
  filename: string
  description: string
  icon: string
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

const viewportTabs: Array<TabsItem> = [
  {
    value: 'desktop',
    label: 'Desktop',
    icon: 'i-heroicons-computer-desktop',
  },
  {
    value: 'mobile',
    label: 'Mobile',
    icon: 'i-heroicons-device-phone-mobile',
  },
]

const contentTabs: Array<TabsItem> = [
  {
    value: 'preview',
    label: 'Preview',
    icon: 'i-heroicons-eye',
  },
  {
    value: 'source',
    label: 'Source Code',
    icon: 'i-heroicons-code-bracket',
  },
]

// Watch for template changes and render the email
watch(
  () => props.template,
  async (newTemplate: EmailTemplate | null) => {
    if (newTemplate) {
      isLoading.value = true
      try {
        // Render the email template to HTML
        renderedHtml.value = await $fetch(`${url.origin}/api/emails/render`, {
          method: 'POST',
          body: {
            name: newTemplate.filename,
          },
        })

        // Load source code from the API
        try {
          const sourceResponse = (await $fetch(
            `${url.origin}/api/emails/source`,
            {
              method: 'POST',
              body: {
                name: newTemplate.filename,
              },
            },
          )) as SourceResponse
          sourceCode.value = sourceResponse.sourceCode
        }
        catch (sourceError) {
          console.error('Failed to load source code:', sourceError)
          const errorMessage
            = sourceError instanceof Error
              ? sourceError.message
              : 'Unknown error'
          sourceCode.value = `// Failed to load source code for ${newTemplate.filename}\n// Error: ${errorMessage}`
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
    <!-- Header -->
    <div>
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
        {{ template.name }}
      </h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {{ template.description }}
      </p>
    </div>

    <!-- Controls -->
    <div class="flex items-center justify-between">
      <!-- Viewport Tabs -->
      <UTabs
        v-model="viewMode"
        :items="viewportTabs"
        :content="false"
        size="md"
        variant="pill"
      />

      <!-- Content Tabs -->
      <UTabs
        v-model="contentMode"
        :items="contentTabs"
        :content="false"
        size="md"
        variant="pill"
      />
    </div>

    <!-- Content Area -->
    <div class="space-y-4">
      <!-- Preview Content -->
      <div v-if="contentMode === 'preview'">
        <div class="flex items-center gap-2 mb-4">
          <UIcon
            :name="
              viewMode === 'desktop'
                ? 'i-heroicons-computer-desktop'
                : 'i-heroicons-device-phone-mobile'
            "
            class="w-4 h-4"
          />
          <span class="text-sm font-medium">Preview</span>
          <UBadge
            variant="soft"
            size="xs"
          >
            {{ viewMode === "desktop" ? "800px" : "375px" }}
          </UBadge>
        </div>

        <UCard class="p-4">
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
        </UCard>
      </div>

      <!-- Source Code Content -->
      <div v-else-if="contentMode === 'source'">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-code-bracket"
              class="w-4 h-4"
            />
            <span class="text-sm font-medium">Source Code</span>
            <UBadge
              variant="soft"
              size="xs"
            >
              {{ template?.filename ?? "-" }}
            </UBadge>
          </div>

          <!-- Copy Button -->
          <UButton
            v-if="sourceCode && isSupported"
            :icon="
              copied ? 'i-heroicons-check' : 'i-heroicons-clipboard-document'
            "
            :color="copied ? 'success' : 'neutral'"
            variant="ghost"
            size="sm"
            @click="copySourceCode"
          >
            {{ copied ? "Copied!" : "Copy Source" }}
          </UButton>
        </div>

        <UCard class="p-0">
          <div
            class="bg-gray-50 dark:bg-gray-800 p-4 max-h-[600px] overflow-auto"
          >
            <pre
              class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono"
            ><code>{{ sourceCode || 'Loading source code...' }}</code></pre>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
