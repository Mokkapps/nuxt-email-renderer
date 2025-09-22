<script setup lang="ts">
import type { Component } from 'vue'

interface EmailTemplate {
  name: string
  filename: string
  description: string
  icon: string
  component: Component
}

const selectedTemplate = ref<EmailTemplate | null>(null)

function onTemplateSelected(template: EmailTemplate) {
  selectedTemplate.value = template
}
</script>

<template>
  <UContainer>
    <div class="py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Nuxt Email
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Preview and explore email templates with desktop and mobile viewports
        </p>
      </div>

      <div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <EmailTemplateSelector @template-selected="onTemplateSelected" />
        </div>

        <div class="lg:col-span-9">
          <EmailTemplateViewer :template="selectedTemplate" />
        </div>
      </div>
    </div>
  </UContainer>
</template>
