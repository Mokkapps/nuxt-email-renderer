<script setup lang="ts">
const { data: email, error } = await useFetch('/api/email')
if (error.value) throw createError(error.value)
</script>

<template>
  <main>
    <h1>Email build pipeline</h1>
    <p>{{ email?.subject }}</p>
    <!-- eslint-disable-next-line vue/singleline-html-element-content-newline -->
    <p>Application   whitespace</p>
    <EmailImportProbe />
  </main>
</template>
