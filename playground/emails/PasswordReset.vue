<script setup lang="ts">
// Professional password reset email with security-focused design
</script>

<template>
  <EHtml>
    <EHead />
    <EPreview>Reset your password - Action required</EPreview>
    <EBody style="background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;">
      <EContainer style="background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; margin: 40px auto; padding: 0; max-width: 600px; overflow: hidden;">
        <!-- Header with Security Badge -->
        <ESection style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); padding: 32px 40px; text-align: center;">
          <EHeading
            as="h1"
            style="color: #ffffff; font-size: 28px; font-weight: bold; margin: 0 0 8px 0;"
          >
            🔒 Password Reset Request
          </EHeading>
          <EText style="color: #fecaca; font-size: 16px; margin: 0;">
            Secure your account with a new password
          </EText>
        </ESection>

        <!-- Main Content -->
        <ESection style="padding: 40px;">
          <EText style="color: #374151; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">
            Hi there,
          </EText>

          <EText style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
            We received a request to reset the password for your account. If you made this request,
            click the button below to create a new password. This link will expire in 24 hours for security reasons.
          </EText>

          <!-- Security Notice -->
          <ESection style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin: 24px 0;">
            <EText style="color: #92400e; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">
              ⚠️ Security Notice
            </EText>
            <EText style="color: #92400e; font-size: 14px; line-height: 1.5; margin: 0;">
              If you didn't request this password reset, please ignore this email.
              Your password will remain unchanged and your account is secure.
            </EText>
          </ESection>

          <!-- Reset Button -->
          <ESection style="text-align: center; margin: 32px 0;">
            <EButton
              href="https://example.com/reset-password?token=abc123"
              style="background-color: #dc2626; color: #ffffff; padding: 16px 40px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);"
            >
              Reset My Password
            </EButton>
          </ESection>

          <!-- Alternative Link -->
          <ESection style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <EText style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 12px 0;">
              <strong>Button not working?</strong> Copy and paste this link into your browser:
            </EText>
            <ECodeInline style="background-color: #e5e7eb; color: #374151; padding: 8px 12px; border-radius: 4px; font-size: 12px; word-break: break-all;">
              https://example.com/reset-password?token=abc123
            </ECodeInline>
          </ESection>

          <!-- Expiration Info -->
          <ESection style="border-top: 1px solid #e5e7eb; padding-top: 24px; margin-top: 32px;">
            <EText style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 12px 0;">
              <strong>Important:</strong> This password reset link will expire in 24 hours for your security.
            </EText>
            <EText style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0;">
              If you need help, contact our support team at <ELink
                href="mailto:support@example.com"
                style="color: #dc2626;"
              >
                support@example.com
              </ELink>
            </EText>
          </ESection>
        </ESection>

        <!-- Footer -->
        <ESection style="background-color: #f8fafc; padding: 24px 40px; border-top: 1px solid #e5e7eb;">
          <EText style="color: #6b7280; font-size: 12px; text-align: center; margin: 0 0 8px 0;">
            This email was sent by Your Company for security purposes.
          </EText>
          <EText style="color: #6b7280; font-size: 12px; text-align: center; margin: 0;">
            © 2024 Your Company. All rights reserved. | 123 Business Street, City, State 12345
          </EText>
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>
