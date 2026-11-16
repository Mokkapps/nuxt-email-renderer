<script setup lang="ts">
const cards = [
  {
    title: 'Vue-Powered Templates',
    description: 'Build email templates using Vue components with full TypeScript support and modern development experience.',
    icon: 'i-ph-envelope-duotone',
  },
  {
    title: 'Pre-built Components',
    description: 'Use a collection of email-optimized Vue components designed for maximum compatibility across email clients.',
    icon: 'i-ph-code-duotone',
  },
  {
    title: 'Responsive Design',
    description: 'Create responsive email layouts that look great on desktop, mobile, and tablet devices.',
    icon: 'i-ph-device-mobile-duotone',
  },
  {
    title: 'Internationalization (i18n)',
    description: 'Easily create multilingual email templates with built-in i18n support when using `@nuxtjs/i18n`.',
    icon: 'i-ph-globe',
  },
  {
    title: 'Live Preview',
    description: 'Preview your email templates in real-time during development with built-in rendering and testing tools.',
    icon: 'i-ph-browser-duotone',
  },
  {
    title: 'Easy Integration',
    description: 'Integrate seamlessly with your existing Nuxt application and email service providers for streamlined email delivery.',
    icon: 'i-ph-rocket-launch-duotone',
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
