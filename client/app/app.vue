<script setup lang="ts">
const emails = await $fetch('/api/emails')
</script>

<template>
  <UApp>
    <NuxtLayout>
      {{ emails }}
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
