<template>
  <EHtml>
    <EHead />
    <EPreview>{{ $t('welcome.title') }}</EPreview>
    <EBody style="background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;">
      <EContainer style="background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; margin: 40px auto; padding: 20px; max-width: 600px;">
        <!-- Header Section -->
        <ESection style="padding: 20px 0;">
          <EHeading
            as="h1"
            style="color: #1f2937; font-size: 32px; font-weight: bold; text-align: center; margin: 0 0 20px 0;"
          >
            {{ $t('welcome.title') }}
          </EHeading>

          <EText style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
            {{ $t('welcome.greeting') }}
          </EText>

          <EText style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
            {{ $t('welcome.message') }}
          </EText>

          <EText style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
            {{ $t('welcome.features.title') }}
          </EText>

          <!-- Feature List -->
          <ESection style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <EText style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 12px 0;">
              ✨ <strong>{{ $t('welcome.features.profile') }}</strong>
            </EText>
            <EText style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 12px 0;">
              🚀 <strong>{{ $t('welcome.features.explore') }}</strong>
            </EText>
            <EText style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0;">
              💬 <strong>{{ $t('welcome.features.community') }}</strong>
            </EText>
          </ESection>
        </ESection>

        <!-- Call to Action -->
        <ESection style="text-align: center; padding: 20px 0;">
          <EButton
            href="https://example.com/dashboard"
            style="background-color: #3b82f6; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block;"
          >
            {{ $t('welcome.cta') }}
          </EButton>
        </ESection>

        <!-- Additional Help -->
        <ESection style="padding: 20px 0; border-top: 1px solid #e5e7eb;">
          <EText style="color: #6b7280; font-size: 14px; line-height: 1.6; text-align: center; margin: 0;">
            {{ $t('welcome.help') }}
          </EText>
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>
