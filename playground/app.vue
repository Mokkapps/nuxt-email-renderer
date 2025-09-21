<script setup lang="ts">
const html = ref('')
const renderEmail = async () => {
  // const emailsDir = useRuntimeConfig().public.nuxtEmail.emailsDir

  try {
    const response = await $fetch('/api/render-email', {
    })
    html.value = response
    console.log('Email rendered successfully:', response)
  }
  catch (error) {
    console.error('Error rendering email:', error)
  }
}
</script>

<template>
  <div>
    Nuxt module playground!
    <button @click="renderEmail">
      Test server
    </button>
    {{ html }}
  </div>
</template>
