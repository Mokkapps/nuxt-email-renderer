<script setup lang="ts">
import brandCss from './css/brand.css?inline'
</script>

<template>
  <EHtml>
    <EHead>
      <EStyle>{{ brandCss }}</EStyle>
    </EHead>
    <EBody>
      <EContainer>
        <EText style="color: var(--brand-color);">
          Inline CSS test
        </EText>
      </EContainer>
    </EBody>
  </EHtml>
</template>
