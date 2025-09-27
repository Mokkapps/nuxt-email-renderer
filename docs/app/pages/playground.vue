<script setup lang="ts">
const title = 'Playground'
const description = 'Play online with our interactive Nuxt Email Renderer playground.'

useSeoMeta({
  title,
  ogTitle: `Nuxt Email Renderer Playground`,
  description,
})

defineOgImageComponent('Docs', {
  title,
  description,
})
</script>

<template>
  <div class="h-[calc(100vh-var(--ui-header-height))]">
    <ClientOnly>
      <iframe
        :src="`https://stackblitz.com/github/nuxt/image/tree/main/example?embed=1&file=app.vue&theme=${$colorMode.preference}`"
        width="100%"
        height="100%"
      />
    </ClientOnly>
  </div>
</template>
