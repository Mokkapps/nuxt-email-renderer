<script setup lang="ts">
import type { Component } from 'vue'
import { useFetch, useRequestURL, ref } from '#imports'

interface EmailTemplate {
  name: string
  filename: string
  description: string
  icon: string
  component: Component
}

const url = useRequestURL()
const { data } = useFetch(`${url.origin}/api/emails/list`, { default: () => [] })

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
        variant="soft"
        color="primary"
      >
        {{ data.length }} templates
      </UBadge>
    </div>

    <div class="grid gap-3">
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
              {{ template.name }}
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
  </div>
</template>
