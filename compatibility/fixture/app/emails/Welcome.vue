<script setup lang="ts">
import logo from './assets/logo.svg?inline'
import css from './assets/email.css?inline'
</script>

<template>
  <!-- eslint-disable vue/singleline-html-element-content-newline -- Literal spacing is part of the regression fixture. -->
  <EHtml>
    <EHead>
      <EStyle>{{ css }}</EStyle>
    </EHead>
    <EBody>
      <ESubject>Welcome to Acme &amp; Co</ESubject>
      <EText>Hello   pipeline</EText>
      <ELink href="https://example.com/first">First</ELink>
      <ELink href="https://example.com/second">Second</ELink>
      <EImg
        :src="logo"
        alt="Pipeline logo"
      />
    </EBody>
  </EHtml>
</template>
