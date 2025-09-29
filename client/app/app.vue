<script setup lang="ts">
const url = useRequestURL()
const { data: templates } = useFetch<Array<EmailTemplate>>(`${url.origin}/api/emails`, {
  default: () => [],
})

const selectedTemplate = ref<EmailTemplate | null>(null)

function onTemplateSelected(template: EmailTemplate) {
  selectedTemplate.value = template
}
</script>

<template>
  <NSplitPane
    storage-key="devtools:nuxt-email-renderer"
    class="!h-screen p-4"
    :min-size="30"
    :horizontal="false"
  >
    <template #left>
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Nuxt Email Renderer
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Preview and explore email templates with desktop and mobile viewports
        </p>
      </div>

      <div class="flex flex-col h-full">
        <EmailTemplateSelector @template-selected="onTemplateSelected" />

        <div
          v-if="templates.length > 0"
          class="mt-8"
        >
          <EmailTemplateViewer :template="selectedTemplate" />
        </div>
      </div>
    </template>
  </NSplitPane>
</template>
