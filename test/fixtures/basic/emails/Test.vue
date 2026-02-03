<script setup lang="ts">
interface Props {
  heading?: string
  siteName?: string
}
const { heading = 'Welcome to our platform! 🎉', siteName = 'Your Company' } = defineProps<Props>()
</script>

<template>
  <EHtml>
    <ESubject>Welcome to {{ siteName }}!</ESubject>
    <EHead />
    <EPreview>Welcome to our platform! Get started with your account today.</EPreview>
    <EBody style="background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;">
      <EContainer style="background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; margin: 40px auto; padding: 20px; max-width: 600px;">
        <!-- Header Section -->
        <ESection style="padding: 20px 0;">
          <EImg
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=60&fit=crop&crop=center"
            alt="Company Logo"
            width="200"
            height="60"
            style="display: block; margin: 0 auto;"
          />
        </ESection>

        <!-- Welcome Message -->
        <ESection style="padding: 20px 0;">
          <EHeading
            as="h1"
            style="color: #1f2937; font-size: 32px; font-weight: bold; text-align: center; margin: 0 0 20px 0;"
          >
            {{ heading }}
          </EHeading>

          <EText style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
            Hi there,
          </EText>

          <EText style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
            Welcome to our platform! We're thrilled to have you join our community of innovators and creators.
            Your journey to amazing possibilities starts right here.
          </EText>

          <EText style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
            To get you started, here are a few things you can do:
          </EText>

          <!-- Feature List -->
          <ESection style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <EText style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 12px 0;">
              ✨ <strong>Complete your profile</strong> - Add your details to personalize your experience
            </EText>
            <EText style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 12px 0;">
              🚀 <strong>Explore features</strong> - Discover all the powerful tools at your disposal
            </EText>
            <EText style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0;">
              💬 <strong>Join the community</strong> - Connect with other users and share experiences
            </EText>
          </ESection>
        </ESection>

        <!-- Call to Action -->
        <ESection style="text-align: center; padding: 20px 0;">
          <EButton
            href="https://example.com/dashboard"
            style="background-color: #3b82f6; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block;"
          >
            Get Started Now
          </EButton>
        </ESection>

        <!-- Additional Help -->
        <ESection style="padding: 20px 0; border-top: 1px solid #e5e7eb;">
          <EText style="color: #6b7280; font-size: 14px; line-height: 1.6; text-align: center; margin: 0 0 12px 0;">
            Need help getting started? We're here for you!
          </EText>
          <EText style="color: #6b7280; font-size: 14px; line-height: 1.6; text-align: center; margin: 0;">
            Visit our <ELink
              href="https://example.com/help"
              style="color: #3b82f6;"
            >
              Help Center
            </ELink> or reply to this email.
          </EText>
        </ESection>

        <!-- Footer -->
        <ESection style="padding: 20px 0; border-top: 1px solid #e5e7eb;">
          <EText style="color: #6b7280; font-size: 12px; text-align: center; margin: 0;">
            © 2024 {{ siteName }}. All rights reserved.<br>
            123 Business Street, City, State 12345
          </EText>
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>
