<script setup lang="ts">
// Newsletter email template with modern design
</script>

<template>
  <EHtml>
    <EHead />
    <EPreview>Your weekly digest: Top stories and insights from this week</EPreview>
    <EBody style="background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;">
      <EContainer style="background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; margin: 40px auto; padding: 0; max-width: 600px; overflow: hidden;">
        <!-- Header -->
        <ESection style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); padding: 32px 40px; text-align: center;">
          <EHeading
            as="h1"
            style="color: #ffffff; font-size: 28px; font-weight: bold; margin: 0 0 8px 0;"
          >
            📰 Weekly Digest
          </EHeading>
          <EText style="color: #c4b5fd; font-size: 16px; margin: 0;">
            September 22, 2024 • Issue #127
          </EText>
        </ESection>

        <!-- Main Content -->
        <ESection style="padding: 40px;">
          <EText style="color: #374151; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">
            Hi Alex,
          </EText>

          <EText style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
            Welcome to this week's digest! We've curated the most important stories,
            insights, and updates from the tech world. Let's dive in!
          </EText>

          <!-- Featured Article -->
          <ESection style="border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; margin: 32px 0;">
            <EImg
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=200&fit=crop"
              alt="Featured Article"
              width="600"
              height="200"
              style="width: 100%; height: auto; display: block;"
            />
            <ESection style="padding: 24px;">
              <EText style="color: #7c3aed; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px 0;">
                Featured Story
              </EText>
              <EHeading
                as="h2"
                style="color: #111827; font-size: 24px; font-weight: bold; line-height: 1.3; margin: 0 0 12px 0;"
              >
                The Future of AI in Software Development
              </EHeading>
              <EText style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Explore how artificial intelligence is revolutionizing the way we write,
                test, and deploy code. From automated testing to intelligent code completion...
              </EText>
              <ELink
                href="https://example.com/article/ai-future"
                style="color: #7c3aed; font-weight: 600; text-decoration: none;"
              >
                Read the full article →
              </ELink>
            </ESection>
          </ESection>

          <!-- News Grid -->
          <ESection style="margin: 32px 0;">
            <EHeading
              as="h3"
              style="color: #111827; font-size: 20px; font-weight: 600; margin: 0 0 20px 0;"
            >
              This Week's Top Stories
            </EHeading>

            <!-- Story 1 -->
            <ESection style="border-bottom: 1px solid #f3f4f6; padding: 20px 0;">
              <ERow>
                <EColumn style="width: 120px;">
                  <EImg
                    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=80&fit=crop"
                    alt="Tech News"
                    width="120"
                    height="80"
                    style="border-radius: 8px; width: 100%; height: auto;"
                  />
                </EColumn>
                <EColumn style="padding-left: 20px;">
                  <EHeading
                    as="h4"
                    style="color: #111827; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;"
                  >
                    New Framework Released: Vue 4.0 Beta
                  </EHeading>
                  <EText style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 0 0 8px 0;">
                    The Vue team announced the beta release of Vue 4.0 with improved performance
                    and new composition features.
                  </EText>
                  <ELink
                    href="https://example.com/vue-4-beta"
                    style="color: #7c3aed; font-size: 14px; font-weight: 600; text-decoration: none;"
                  >
                    Learn more →
                  </ELink>
                </EColumn>
              </ERow>
            </ESection>

            <!-- Story 2 -->
            <ESection style="border-bottom: 1px solid #f3f4f6; padding: 20px 0;">
              <ERow>
                <EColumn style="width: 120px;">
                  <EImg
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&h=80&fit=crop"
                    alt="Data Analysis"
                    width="120"
                    height="80"
                    style="border-radius: 8px; width: 100%; height: auto;"
                  />
                </EColumn>
                <EColumn style="padding-left: 20px;">
                  <EHeading
                    as="h4"
                    style="color: #111827; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;"
                  >
                    GitHub's 2024 Developer Survey Results
                  </EHeading>
                  <EText style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 0 0 8px 0;">
                    Insights into developer preferences, tools, and trends based on responses
                    from over 100,000 developers worldwide.
                  </EText>
                  <ELink
                    href="https://example.com/github-survey"
                    style="color: #7c3aed; font-size: 14px; font-weight: 600; text-decoration: none;"
                  >
                    View results →
                  </ELink>
                </EColumn>
              </ERow>
            </ESection>

            <!-- Story 3 -->
            <ESection style="padding: 20px 0;">
              <ERow>
                <EColumn style="width: 120px;">
                  <EImg
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=120&h=80&fit=crop"
                    alt="Security"
                    width="120"
                    height="80"
                    style="border-radius: 8px; width: 100%; height: auto;"
                  />
                </EColumn>
                <EColumn style="padding-left: 20px;">
                  <EHeading
                    as="h4"
                    style="color: #111827; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;"
                  >
                    Critical Security Update for Node.js
                  </EHeading>
                  <EText style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 0 0 8px 0;">
                    Node.js releases security patches addressing vulnerabilities in versions
                    18.x and 20.x. Update recommended.
                  </EText>
                  <ELink
                    href="https://example.com/nodejs-security"
                    style="color: #7c3aed; font-size: 14px; font-weight: 600; text-decoration: none;"
                  >
                    Security details →
                  </ELink>
                </EColumn>
              </ERow>
            </ESection>
          </ESection>

          <!-- Quick Tips Section -->
          <ESection style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; padding: 24px; margin: 32px 0;">
            <EHeading
              as="h3"
              style="color: #0c4a6e; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;"
            >
              💡 Quick Tip of the Week
            </EHeading>
            <EText style="color: #0c4a6e; font-size: 16px; line-height: 1.6; margin: 0 0 12px 0;">
              <strong>Use CSS Container Queries</strong> for more responsive designs that adapt to their container size rather than just viewport size.
            </EText>
            <ECodeInline style="background-color: #bae6fd; color: #0c4a6e; padding: 8px 12px; border-radius: 6px; font-size: 14px; display: block; margin: 12px 0;">
              @container (min-width: 400px) { .card { display: grid; } }
            </ECodeInline>
          </ESection>

          <!-- Community Spotlight -->
          <ESection style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin: 32px 0;">
            <EHeading
              as="h3"
              style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;"
            >
              🌟 Community Spotlight
            </EHeading>
            <EText style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
              This week we're featuring <strong>Maria Rodriguez</strong>, who built an amazing
              accessibility testing tool that's helping developers create more inclusive web experiences.
            </EText>
            <ELink
              href="https://example.com/community/maria"
              style="color: #7c3aed; font-weight: 600; text-decoration: none;"
            >
              Read Maria's story →
            </ELink>
          </ESection>

          <!-- CTA Section -->
          <ESection style="text-align: center; margin: 32px 0;">
            <EHeading
              as="h3"
              style="color: #111827; font-size: 20px; font-weight: 600; margin: 0 0 12px 0;"
            >
              Want to contribute?
            </EHeading>
            <EText style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
              Share your own tech insights with our community
            </EText>
            <EButton
              href="https://example.com/submit-story"
              style="background-color: #7c3aed; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block;"
            >
              Submit Your Story
            </EButton>
          </ESection>
        </ESection>

        <!-- Footer -->
        <ESection style="background-color: #f8fafc; padding: 32px 40px; border-top: 1px solid #e5e7eb;">
          <EText style="color: #6b7280; font-size: 14px; line-height: 1.6; text-align: center; margin: 0 0 16px 0;">
            You're receiving this because you subscribed to our weekly newsletter.
          </EText>
          <EText style="color: #6b7280; font-size: 12px; text-align: center; margin: 0 0 8px 0;">
            <ELink
              href="https://example.com/unsubscribe"
              style="color: #6b7280;"
            >
              Unsubscribe
            </ELink> •
            <ELink
              href="https://example.com/preferences"
              style="color: #6b7280;"
            >
              Update preferences
            </ELink> •
            <ELink
              href="https://example.com/archive"
              style="color: #6b7280;"
            >
              View archive
            </ELink>
          </EText>
          <EText style="color: #6b7280; font-size: 12px; text-align: center; margin: 0;">
            © 2024 Tech Weekly. All rights reserved. | 789 Newsletter Ave, Content City, CC 67890
          </EText>
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>
