<script setup>
// Returns undefined in production mode or when the DevTools are not enabled
const devtoolsClient = useNuxtDevTools() // NuxtDevToolsHostClient | undefined
</script>

<template>
  <button
    v-if="devtoolsClient"
    @click="devtoolsClient.devtools.navigate('/modules/custom-nuxt-email-renderer')"
  >
    <!-- Open the DevTools and navigate to the components tab -->
    Open DevTools
  </button>
  <span v-else>Nuxt DevTools are not enabled</span>
</template>
