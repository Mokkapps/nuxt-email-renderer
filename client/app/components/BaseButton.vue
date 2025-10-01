<script setup lang="ts">
interface Props {
  isLoading?: boolean
  isDisabled?: boolean
  icon: string
}
defineProps<Props>()
</script>

<template>
  <NButton
    :disabled="isLoading || isDisabled"
  >
    <template #icon>
      <NIcon
        :icon="isLoading ? 'carbon:circle-dash' : icon"
        :class="{ 'animate-spin': isLoading }"
      />
    </template>
    <slot />
  </NButton>
</template>
