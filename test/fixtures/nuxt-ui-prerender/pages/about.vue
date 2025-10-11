<template>
  <div>
    <h1>About Page</h1>
    <UButton to="/">
      Go to Home
    </UButton>
    <div
      v-if="emailHtml"
      v-html="emailHtml"
    />
  </div>
</template>

<script setup>
const { data: emailHtml } = await useFetch('/api/emails/render', {
  method: 'POST',
  body: {
    name: 'Test',
  },
})
</script>
