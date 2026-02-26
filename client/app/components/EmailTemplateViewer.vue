<script setup lang="ts">
interface Props {
  template: EmailTemplate | null
}

const props = defineProps<Props>()

const viewMode = ref<'desktop' | 'mobile'>('desktop')
const contentMode = ref<'preview' | 'html' | 'source'>('preview')

const url = useRequestURL()

const { data, error, pending: isLoading, refresh } = useAsyncData(async () => {
  if (!props.template) {
    return {
      html: null,
      subject: null,
      sourceCode: null,
    }
  }
  const response = await $fetch<{ html: string, subject: string } | string>(`${url.origin}/api/emails/render`, {
    method: 'POST',
    body: {
      name: props.template.filename,
      pretty: true,
    },
  })

  const html = typeof response === 'string' ? response : response.html
  const subject = typeof response === 'string' ? null : response.subject

  const sourceResponse = await $fetch<{ sourceCode: string }>(`${url.origin}/api/emails/source`, {
    method: 'POST',
    body: {
      name: props.template.filename,
    },
  })
  const sourceCode = sourceResponse.sourceCode

  return { html, subject, sourceCode }
}, { watch: [() => props.template] })

const sourceCode = computed(() => data.value?.sourceCode ?? null)
const renderedHtml = computed(() => data.value?.html ?? null)
const renderedSubject = computed(() => data.value?.subject ?? null)
</script>

<template>
  <div class="space-y-2">
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
        <NIcon
          icon="carbon:email"
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
        :rendered-html="renderedHtml"
        :rendered-subject="renderedSubject"
        :source-code="sourceCode"
        @refresh="refresh"
      />

      <div class="space-y-4">
        <div v-if="contentMode === 'preview'">
          <EmailPreviewPane
            :rendered-html="renderedHtml"
            :view-mode="viewMode"
          />
        </div>

        <div v-else-if="contentMode === 'html'">
          <EmailSourceCodeViewer
            :source-code="renderedHtml"
            :content-mode="contentMode"
          />
        </div>

        <div v-else-if="contentMode === 'source'">
          <EmailSourceCodeViewer
            :source-code="sourceCode"
            :content-mode="contentMode"
          />
        </div>
      </div>
    </div>
  </div>
</template>
