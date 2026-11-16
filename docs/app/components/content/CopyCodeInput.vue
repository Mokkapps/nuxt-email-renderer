<script setup lang="ts">
const props = defineProps<{
  source: string
}>()

const copied = ref(false)
const error = ref(false)
let resetTimeout: ReturnType<typeof setTimeout> | undefined

async function copy() {
  clearTimeout(resetTimeout)
  copied.value = false
  error.value = false

  try {
    await navigator.clipboard.writeText(props.source)
    copied.value = true
    resetTimeout = setTimeout(() => {
      copied.value = false
    }, 2000)
  }
  catch {
    error.value = true
  }
}

onBeforeUnmount(() => clearTimeout(resetTimeout))
</script>

<template>
  <div class="w-full min-w-0 max-w-lg">
    <div class="flex items-center gap-2 rounded-lg border border-default bg-default px-3 py-2">
      <UIcon
        name="i-lucide-terminal"
        class="shrink-0 text-muted"
      />
      <input
        :value="props.source"
        aria-label="Installation command"
        readonly
        class="min-w-0 flex-1 bg-transparent font-mono text-xs text-toned outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-sm"
      >
      <UButton
        :color="copied ? 'success' : 'neutral'"
        variant="ghost"
        :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
        :aria-label="copied ? 'Command copied' : 'Copy installation command'"
        @click="copy"
      />
    </div>
    <p
      role="status"
      class="mt-2 text-sm text-muted"
    >
      {{ error ? 'Could not copy. Select the command and copy it manually.' : copied ? 'Copied to clipboard.' : '' }}
    </p>
  </div>
</template>
