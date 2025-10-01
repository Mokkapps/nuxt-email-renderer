<script setup lang="ts">
const url = useRequestURL()
const { data: emailTemplates, pending: isLoadingEmailTemplates, error: emailTemplatesError } = await useFetch<Array<EmailTemplate>>(`${url.origin}/api/emails`, {
  default: () => [],
})

const selectedTemplate = ref<EmailTemplate | null>(null)

function onTemplateSelected(template: EmailTemplate) {
  selectedTemplate.value = template
}

watch(emailTemplates, (newTemplates) => {
  if (newTemplates.length > 0 && !selectedTemplate.value) {
    selectedTemplate.value = newTemplates[0]
  }
}, { immediate: true })
</script>

<template>
  <div
    fixed
    inset-0
    h-screen
    w-screen
    font-sans
  >
    <NuxtLoadingIndicator />
    <NNotification />

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

        <div
          v-if="isLoadingEmailTemplates"
          class="flex mt-8"
        >
          <NLoading>Loading email templates...</NLoading>
        </div>

        <div
          v-else-if="emailTemplatesError"
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
            {{ emailTemplatesError }}
          </NTip>
        </div>

        <NCard
          v-if="emailTemplates.length === 0"
          class="text-center py-12"
        >
          <NIcon
            icon="carbon:email"
            class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4"
          />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No email templates found
          </h3>
          <p class="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
            Create your first email template by adding a .vue file to the emails directory.
          </p>
        </NCard>

        <div
          v-else
          class="flex flex-col h-full"
        >
          <EmailTemplateSelector
            :email-templates="emailTemplates"
            :selected-template="selectedTemplate"
            @select="onTemplateSelected"
          />

          <div class="mt-8">
            <EmailTemplateViewer :template="selectedTemplate" />
          </div>
        </div>
      </template>
    </NSplitPane>
  </div>
</template>
