<script setup lang="ts">
import logoSrc from '~/emails/assets/logo.svg?inline'
</script>

<template>
  <EHtml>
    <EHead />
    <EBody>
      <EContainer>
        <EImg
          :src="logoSrc"
          alt="Inline Logo"
          width="120"
          height="24"
        />
      </EContainer>
    </EBody>
  </EHtml>
</template>
