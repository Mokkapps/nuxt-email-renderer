<script setup lang="ts">
const template = `<template>
  <EHtml>
    <EHead />
    <EBody>
      <EContainer>
        <EHeading>Welcome aboard!</EHeading>
        <EText>Your next idea starts here.</EText>
        <EButton href="https://example.com">
          Get started
        </EButton>
      </EContainer>
    </EBody>
  </EHtml>
</template>`
</script>

<template>
  <div class="grid w-full min-w-0 overflow-hidden rounded-2xl border border-default bg-default text-left shadow-xl lg:grid-cols-2">
    <div class="min-w-0 border-b border-default lg:border-r lg:border-b-0">
      <div class="border-b border-default bg-elevated px-6 py-3 text-sm font-medium text-muted">
        emails/Welcome.vue
      </div>
      <pre class="overflow-x-auto p-6 text-xs leading-7 text-toned sm:text-sm"><code>{{ template }}</code></pre>
    </div>
    <div class="flex flex-col bg-elevated">
      <div class="border-b border-default px-6 py-3 text-sm font-medium text-muted">
        Email preview
      </div>
      <div class="flex flex-1 items-center justify-center p-6 sm:p-10">
        <div class="w-full max-w-sm rounded-xl border border-default bg-default p-8">
          <UIcon
            name="i-lucide-mail"
            class="mb-6 size-8 text-primary"
          />
          <p class="mb-3 text-2xl font-semibold text-highlighted">
            Welcome aboard!
          </p>
          <p class="mb-6 text-muted">
            Your next idea starts here.
          </p>
          <span class="inline-block rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-inverted">Get started</span>
        </div>
      </div>
    </div>
  </div>
</template>
