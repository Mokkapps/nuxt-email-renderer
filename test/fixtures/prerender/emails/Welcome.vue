<script setup lang="ts">
defineProps<{
  name?: string
}>()
</script>

<template>
  <EHtml>
    <EHead />
    <EBody>
      <EContainer>
        <EHeading>Welcome {{ name || 'Guest' }}</EHeading>
        <EText>This is a test email template</EText>
      </EContainer>
    </EBody>
  </EHtml>
</template>
