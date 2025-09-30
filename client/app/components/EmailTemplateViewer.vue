<script setup lang="ts">
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

const viewportClass = computed(() => {
  return viewMode.value === 'mobile'
    ? 'max-w-[375px] mx-auto'
    : 'max-w-[800px] mx-auto'
})
</script>

<template>
  <div class="space-y-2">
    <div class="flex items-center gap-2">
      <NIconTitle
        :text="template?.displayName ?? 'Please select a template'"
        icon="carbon:email"
      />
      <NBadge v-if="template">
        {{ template.filename }}
      </NBadge>
    </div>

    <div
      v-if="isLoading"
      class="flex mt-8"
    >
      <NLoading>Loading email template...</NLoading>
    </div>

    <div
      v-else-if="error"
      class="flex flex-col"
    >
      <NTip
        n="red6 dark:red5"
        icon="carbon:warning-alt"
      >
        Error!
      </NTip>
      <NTip n="red6 dark:red5">
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
      <EmailViewerToolbar
        v-model:view-mode="viewMode"
        v-model:content-mode="contentMode"
        :is-loading="isLoading"
        :rendered-html="renderedHtml"
        :source-code="sourceCode"
        @refresh="refresh"
      />

      <div class="space-y-4">
        <div v-if="contentMode === 'preview'">
          <EmailPreviewPane
            :is-loading="isLoading"
            :rendered-html="renderedHtml"
            :viewport-class="viewportClass"
          />
        </div>

        <div v-else-if="contentMode === 'source'">
          <EmailSourceCodeViewer :source-code="sourceCode" />
        </div>
      </div>
    </div>
  </div>
</template>
