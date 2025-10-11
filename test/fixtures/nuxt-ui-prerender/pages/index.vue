<template>
  <div>
    <h1>Index Page</h1>
    <UButton to="/about">
      Go to About
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
