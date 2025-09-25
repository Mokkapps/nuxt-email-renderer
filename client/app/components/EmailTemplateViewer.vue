<script setup lang="ts">
import type { Component } from 'vue'

interface EmailTemplate {
  name: string
  filename: string
  description: string
  icon: string
  component: Component
}

interface Props {
  template: EmailTemplate | null
}

const props = defineProps<Props>()

const viewMode = ref<'desktop' | 'mobile'>('desktop')
const showSource = ref(false)
const renderedHtml = ref('')
const sourceCode = ref('')
const isLoading = ref(false)

const url = useRequestURL()

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

        // Load source code (for now, we'll use a placeholder)
        sourceCode.value = `// Source code for ${newTemplate.filename}\n// This would contain the actual Vue component source`
      }
      catch (error) {
        console.error('Failed to render template:', error)
        renderedHtml.value = '<div>Failed to render template</div>'
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

const viewPortRadioGroupItems = ref([{
  label: 'Desktop',
  value: 'desktop',
}, {
  label: 'Mobile',
  value: 'mobile',
}])
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
    <!-- Header Controls -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          {{ template.name }}
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {{ template.description }}
        </p>
      </div>

      <div class="flex items-center gap-3">
        <!-- View Mode Toggle -->
        <URadioGroup
          v-model="viewMode"
          orientation="horizontal"
          variant="list"
          size="xl"
          default-value="System"
          :items="viewPortRadioGroupItems"
        />

        <!-- Source Code Toggle -->
        <UButton
          :variant="showSource ? 'solid' : 'outline'"
          icon="i-heroicons-code-bracket"
          size="sm"
          @click="showSource = !showSource"
        >
          Source
        </UButton>
      </div>
    </div>

    <!-- Content Area -->
    <div
      class="grid gap-6"
      :class="showSource ? 'lg:grid-cols-2' : 'grid-cols-1'"
    >
      <!-- Template Preview -->
      <div class="space-y-4">
        <div class="flex items-center gap-2">
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

      <!-- Source Code -->
      <div
        v-if="showSource"
        class="space-y-4"
      >
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
            {{ template?.filename ?? '-' }}
          </UBadge>
        </div>

        <UCard class="p-0">
          <div
            class="bg-gray-50 dark:bg-gray-800 p-4 max-h-[600px] overflow-auto"
          >
            <pre
              class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap"
            ><code>{{ sourceCode || 'Loading source code...' }}</code></pre>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
