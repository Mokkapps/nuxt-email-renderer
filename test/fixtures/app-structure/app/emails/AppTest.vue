<script setup lang="ts">
interface Props {
  heading?: string
}
const { heading = 'Welcome from app/emails! 🎉' } = defineProps<Props>()
</script>

<template>
  <EHtml>
    <EHead />
    <EPreview>Test email from app/emails directory (Nuxt 4 structure)</EPreview>
    <EBody style="background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;">
      <EContainer style="background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; margin: 40px auto; padding: 20px; max-width: 600px;">
        <ESection style="padding: 20px 0;">
          <EHeading
            as="h1"
            style="color: #1f2937; font-size: 32px; font-weight: bold; text-align: center; margin: 0 0 20px 0;"
          >
            {{ heading }}
          </EHeading>

          <EText style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
            This email template is served from the app/emails directory using Nuxt 4 file structure.
          </EText>
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>
