<script setup lang="ts">
// Team invitation email template
</script>

<template>
  <EHtml>
    <EHead />
    <EPreview>You've been invited to join the Design Team workspace</EPreview>
    <EBody style="background-color: #fafafa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;">
      <EContainer style="background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; margin: 40px auto; padding: 0; max-width: 600px; overflow: hidden;">
        <!-- Header -->
        <ESection style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 32px 40px; text-align: center;">
          <EHeading
            as="h1"
            style="color: #ffffff; font-size: 28px; font-weight: bold; margin: 0 0 8px 0;"
          >
            🎯 You're Invited!
          </EHeading>
          <EText style="color: #bfdbfe; font-size: 16px; margin: 0;">
            Join your team and start collaborating
          </EText>
        </ESection>

        <!-- Main Content -->
        <ESection style="padding: 40px;">
          <EText style="color: #374151; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">
            Hi Jennifer,
          </EText>

          <EText style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
            <strong>Sarah Martinez</strong> has invited you to join the <strong>Design Team</strong> workspace.
            You'll have access to shared projects, team discussions, and collaboration tools.
          </EText>

          <!-- Invitation Details -->
          <ESection style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <ERow>
              <EColumn style="width: 80px;">
                <EImg
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face"
                  alt="Sarah Martinez"
                  width="80"
                  height="80"
                  style="border-radius: 50%; border: 3px solid #3b82f6;"
                />
              </EColumn>
              <EColumn style="padding-left: 20px;">
                <EText style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 4px 0;">
                  Design Team
                </EText>
                <EText style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0;">
                  Invited by Sarah Martinez • Design Lead
                </EText>
                <EText style="color: #6b7280; font-size: 14px; margin: 0;">
                  12 team members • Creative workspace
                </EText>
              </EColumn>
            </ERow>
          </ESection>

          <!-- Team Members Preview -->
          <ESection style="margin: 32px 0;">
            <EHeading
              as="h3"
              style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;"
            >
              Meet Your New Teammates
            </EHeading>

            <ERow>
              <EColumn style="width: 25%; text-align: center; padding: 0 8px;">
                <EImg
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
                  alt="Team Member"
                  width="60"
                  height="60"
                  style="border-radius: 50%; margin: 0 auto 8px auto; display: block;"
                />
                <EText style="color: #374151; font-size: 12px; font-weight: 600; margin: 0;">
                  Alex Chen
                </EText>
                <EText style="color: #6b7280; font-size: 11px; margin: 0;">
                  UI Designer
                </EText>
              </EColumn>
              <EColumn style="width: 25%; text-align: center; padding: 0 8px;">
                <EImg
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
                  alt="Team Member"
                  width="60"
                  height="60"
                  style="border-radius: 50%; margin: 0 auto 8px auto; display: block;"
                />
                <EText style="color: #374151; font-size: 12px; font-weight: 600; margin: 0;">
                  Emma Wilson
                </EText>
                <EText style="color: #6b7280; font-size: 11px; margin: 0;">
                  UX Research
                </EText>
              </EColumn>
              <EColumn style="width: 25%; text-align: center; padding: 0 8px;">
                <EImg
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
                  alt="Team Member"
                  width="60"
                  height="60"
                  style="border-radius: 50%; margin: 0 auto 8px auto; display: block;"
                />
                <EText style="color: #374151; font-size: 12px; font-weight: 600; margin: 0;">
                  Mike Torres
                </EText>
                <EText style="color: #6b7280; font-size: 11px; margin: 0;">
                  Product Design
                </EText>
              </EColumn>
              <EColumn style="width: 25%; text-align: center; padding: 0 8px;">
                <ESection style="width: 60px; height: 60px; background-color: #e5e7eb; border-radius: 50%; margin: 0 auto 8px auto; display: flex; align-items: center; justify-content: center;">
                  <EText style="color: #6b7280; font-size: 14px; font-weight: 600; margin: 0;">
                    +8
                  </EText>
                </ESection>
                <EText style="color: #6b7280; font-size: 11px; margin: 0;">
                  more members
                </EText>
              </EColumn>
            </ERow>
          </ESection>

          <!-- What You'll Get -->
          <ESection style="margin: 32px 0;">
            <EHeading
              as="h3"
              style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;"
            >
              What You'll Get Access To
            </EHeading>

            <ESection style="margin: 16px 0;">
              <EText style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 8px 0;">
                🎨 <strong>Design System</strong> - Shared components and design tokens
              </EText>
              <EText style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 8px 0;">
                📁 <strong>Project Files</strong> - Access to current and past design projects
              </EText>
              <EText style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 8px 0;">
                💬 <strong>Team Chat</strong> - Real-time communication and collaboration
              </EText>
              <EText style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0;">
                📊 <strong>Analytics</strong> - Performance metrics and user insights
              </EText>
            </ESection>
          </ESection>

          <!-- Accept Invitation Button -->
          <ESection style="text-align: center; margin: 40px 0;">
            <EButton
              href="https://example.com/accept-invitation?token=abc123"
              style="background-color: #3b82f6; color: #ffffff; padding: 18px 40px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 18px; display: inline-block; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);"
            >
              Accept Invitation
            </EButton>
            <EText style="color: #6b7280; font-size: 14px; margin: 16px 0 0 0;">
              This invitation expires in 7 days
            </EText>
          </ESection>

          <!-- Alternative Actions -->
          <ESection style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <EText style="color: #6b7280; font-size: 14px; line-height: 1.6; text-align: center; margin: 0 0 12px 0;">
              <strong>Can't click the button?</strong> Copy this link to your browser:
            </EText>
            <ECodeInline style="background-color: #e5e7eb; color: #374151; padding: 8px 12px; border-radius: 4px; font-size: 12px; word-break: break-all; display: block; text-align: center;">
              https://example.com/accept-invitation?token=abc123
            </ECodeInline>
          </ESection>

          <!-- Security Note -->
          <ESection style="border-top: 1px solid #e5e7eb; padding-top: 24px; margin-top: 32px;">
            <EText style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 12px 0;">
              <strong>Security Note:</strong> This invitation was sent to jennifer@example.com.
              If you weren't expecting this invitation, you can safely ignore this email.
            </EText>
            <EText style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0;">
              Questions? Contact us at <ELink
                href="mailto:support@example.com"
                style="color: #3b82f6;"
              >
                support@example.com
              </ELink>
            </EText>
          </ESection>
        </ESection>

        <!-- Footer -->
        <ESection style="background-color: #f8fafc; padding: 24px 40px; border-top: 1px solid #e5e7eb;">
          <EText style="color: #6b7280; font-size: 12px; text-align: center; margin: 0 0 8px 0;">
            You received this invitation because Sarah Martinez invited you to join their team.
          </EText>
          <EText style="color: #6b7280; font-size: 12px; text-align: center; margin: 0;">
            © 2024 TeamSpace. All rights reserved. | 321 Collaboration Blvd, Team City, TC 54321
          </EText>
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>
