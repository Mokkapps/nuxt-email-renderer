<script setup lang="ts">
import type { Component } from 'vue'

interface EmailTemplate {
  name: string
  filename: string
  description: string
  icon: string
  component: Component
}

const url = useRequestURL()
const { data } = useFetch<Array<EmailTemplate>>(`${url.origin}/api/emails`, {
  default: () => [],
})

watch(data, (newData) => {
  if (newData.length > 0) {
    emit('template-selected', newData[0])
  }
})

const emit = defineEmits<{
  'template-selected': [template: EmailTemplate]
}>()

const selectedTemplate = computed({
  get: () => data.value ? data.value[0] : null,
  set: (value: EmailTemplate) => {
    emit('template-selected', value)
  },
})
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
        Email Templates
      </h2>
      <NBadge
        v-if="data.length > 0"
      >
        {{ data.length }} templates
      </NBadge>
    </div>

    <NCard
      v-if="data.length > 0"
      class="grid gap-3"
    >
      <NSelect v-model="selectedTemplate">
        <option
          v-for="template in data"
          :key="template.filename"
          :value="template"
        >
          {{ template.filename }}
        </option>
      </NSelect>
    </NCard>

    <!-- Empty State -->
    <div
      v-else
      class="text-center py-12"
    >
      <UIcon
        name="i-heroicons-envelope"
        class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4"
      />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        No email templates found
      </h3>
      <p class="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
        Create your first email template by adding a <UKbd>.vue</UKbd> file to the <UKbd>
          emails
        </UKbd>
        directory.
      </p>
    </div>
  </div>
</template>
