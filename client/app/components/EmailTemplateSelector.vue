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
const { data } = useFetch(`${url.origin}/api/emails`, {
  default: () => [],
})

const emit = defineEmits<{
  'template-selected': [template: EmailTemplate]
}>()

const selectedTemplate = ref<EmailTemplate | null>(null)

function selectTemplate(template: EmailTemplate) {
  selectedTemplate.value = template
  emit('template-selected', template)
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
        Email Templates
      </h2>
      <UBadge
        v-if="data.length > 0"
        variant="soft"
        color="primary"
      >
        {{ data.length }} templates
      </UBadge>
    </div>

    <div
      v-if="data.length > 0"
      class="grid gap-3"
    >
      <UCard
        v-for="template in data"
        :key="template.filename"
        class="cursor-pointer transition-all hover:shadow-md"
        :class="{
          'ring-2 ring-primary-500':
            selectedTemplate?.filename === template.filename,
        }"
        @click="selectTemplate(template)"
      >
        <div class="flex items-start gap-4">
          <div class="flex-1 min-w-0">
            <h3 class="font-medium text-gray-900 dark:text-white">
              {{ template.displayName }}
            </h3>
            <div class="mt-2">
              <UBadge
                variant="soft"
                size="xs"
              >
                {{ template.filename }}
              </UBadge>
            </div>
          </div>
          <div class="flex-shrink-0">
            <UIcon
              name="i-heroicons-chevron-right"
              class="w-5 h-5 text-gray-400"
            />
          </div>
        </div>
      </UCard>
    </div>

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
