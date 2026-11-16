<script setup lang="ts">
const cards = [
  {
    title: '1. Install the module',
    description: 'Add the module to your Nuxt app and create your first email template.',
    icon: 'i-lucide-download',
    to: '/getting-started/installation',
  },
  {
    title: '2. Compose your email',
    description: 'Build with typed components for headings, text, buttons, layouts, and more.',
    icon: 'i-lucide-blocks',
    to: '/components/html',
  },
  {
    title: '3. Render and send',
    description: 'Generate HTML and plain text on the server for your preferred email provider.',
    icon: 'i-lucide-send',
    to: '/getting-started/usage',
  },
]
</script>

<template>
  <UPageGrid>
    <UPageCard
      v-for="card in cards"
      :key="card.title"
      v-bind="card"
      spotlight
    />
  </UPageGrid>
</template>
