<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  // This will run when the component is mounted
  console.log('Test email component mounted')
})
</script>

<template>
  <EHtml>
    <EText>
      WOW! This is a test email.
    </EText>
  </EHtml>
</template>
