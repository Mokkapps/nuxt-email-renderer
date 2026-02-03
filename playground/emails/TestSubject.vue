<script setup lang="ts">
interface Props {
  userName?: string
  companyName?: string
}
const { userName = 'John', companyName = 'Acme & Co' } = defineProps<Props>()
</script>

<template>
  <EHtml>
    <ESubject>Welcome to {{ companyName }}, {{ userName }}!</ESubject>
    <EHead />
    <EPreview>Welcome to our platform</EPreview>
    <EBody style="background-color: #f6f9fc; font-family: Arial, sans-serif;">
      <EContainer style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <ESection>
          <EHeading as="h1">
            Hello {{ userName }}!
          </EHeading>
          <EText>
            Welcome to {{ companyName }}. We're excited to have you on board.
          </EText>
          <EButton href="https://example.com/get-started">
            Get Started
          </EButton>
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>
