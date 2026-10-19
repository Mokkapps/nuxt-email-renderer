<script setup lang="ts">
// Application code may import email templates outside the Nitro environment.
import Welcome from '~/emails/Welcome.vue'
</script>

<template>
  <p class="email-import-probe">
    Imported email: {{ Welcome.__name }}
  </p>
</template>

<style scoped>
.email-import-probe { color: #654321; }
</style>
