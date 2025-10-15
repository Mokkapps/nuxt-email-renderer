<script setup lang="ts">
const props = defineProps<{
  name: string
}>()
</script>

<template>
  <EHtml>
    <EHead />
    <EBody>
      <EContainer>
        <EHeading>{{ $t("welcome") }}</EHeading>
        <EText>{{ $t("greeting", { name: props.name }) }}</EText>
        <EText>{{ $t("message") }}</EText>
        <EButton href="https://example.com">
          {{ $t("button") }}
        </EButton>
      </EContainer>
    </EBody>
  </EHtml>
</template>
