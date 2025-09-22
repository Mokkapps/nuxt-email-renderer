<script setup lang="ts">
// E-commerce order confirmation email template
</script>

<template>
  <EHtml>
    <EHead />
    <EPreview>Order confirmed! Your items are being prepared for shipment.</EPreview>
    <EBody style="background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;">
      <EContainer style="background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; margin: 40px auto; padding: 0; max-width: 600px; overflow: hidden;">
        <!-- Header -->
        <ESection style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 32px 40px; text-align: center;">
          <EHeading
            as="h1"
            style="color: #ffffff; font-size: 28px; font-weight: bold; margin: 0 0 8px 0;"
          >
            ✅ Order Confirmed!
          </EHeading>
          <EText style="color: #a7f3d0; font-size: 16px; margin: 0;">
            Thank you for your purchase
          </EText>
        </ESection>

        <!-- Order Details -->
        <ESection style="padding: 40px;">
          <EText style="color: #374151; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">
            Hi Sarah,
          </EText>

          <EText style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
            Great news! We've received your order and it's being prepared for shipment.
            You'll receive another email with tracking information once your items are on their way.
          </EText>

          <!-- Order Summary Box -->
          <ESection style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <ERow>
              <EColumn style="width: 50%;">
                <EText style="color: #6b7280; font-size: 14px; margin: 0 0 4px 0;">
                  Order Number
                </EText>
                <EText style="color: #111827; font-size: 16px; font-weight: 600; margin: 0;">
                  #ORD-2024-001234
                </EText>
              </EColumn>
              <EColumn style="width: 50%; text-align: right;">
                <EText style="color: #6b7280; font-size: 14px; margin: 0 0 4px 0;">
                  Order Date
                </EText>
                <EText style="color: #111827; font-size: 16px; font-weight: 600; margin: 0;">
                  September 22, 2024
                </EText>
              </EColumn>
            </ERow>
          </ESection>

          <!-- Items Ordered -->
          <ESection style="margin: 32px 0;">
            <EHeading
              as="h2"
              style="color: #111827; font-size: 20px; font-weight: 600; margin: 0 0 16px 0;"
            >
              Items Ordered
            </EHeading>

            <!-- Item 1 -->
            <ESection style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 0 0 12px 0;">
              <ERow>
                <EColumn style="width: 80px;">
                  <EImg
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop"
                    alt="Premium Headphones"
                    width="80"
                    height="80"
                    style="border-radius: 8px;"
                  />
                </EColumn>
                <EColumn style="padding-left: 16px;">
                  <EText style="color: #111827; font-size: 16px; font-weight: 600; margin: 0 0 4px 0;">
                    Premium Wireless Headphones
                  </EText>
                  <EText style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0;">
                    Color: Midnight Black • Qty: 1
                  </EText>
                  <EText style="color: #111827; font-size: 16px; font-weight: 600; margin: 0;">
                    $299.99
                  </EText>
                </EColumn>
              </ERow>
            </ESection>

            <!-- Item 2 -->
            <ESection style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 0 0 12px 0;">
              <ERow>
                <EColumn style="width: 80px;">
                  <EImg
                    src="https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=80&h=80&fit=crop"
                    alt="Wireless Charger"
                    width="80"
                    height="80"
                    style="border-radius: 8px;"
                  />
                </EColumn>
                <EColumn style="padding-left: 16px;">
                  <EText style="color: #111827; font-size: 16px; font-weight: 600; margin: 0 0 4px 0;">
                    Fast Wireless Charger
                  </EText>
                  <EText style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0;">
                    Color: White • Qty: 1
                  </EText>
                  <EText style="color: #111827; font-size: 16px; font-weight: 600; margin: 0;">
                    $49.99
                  </EText>
                </EColumn>
              </ERow>
            </ESection>
          </ESection>

          <!-- Order Total -->
          <ESection style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <ERow style="border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 8px;">
              <EColumn style="width: 70%;">
                <EText style="color: #6b7280; font-size: 14px; margin: 0;">
                  Subtotal
                </EText>
              </EColumn>
              <EColumn style="width: 30%; text-align: right;">
                <EText style="color: #6b7280; font-size: 14px; margin: 0;">
                  $349.98
                </EText>
              </EColumn>
            </ERow>
            <ERow style="border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 8px;">
              <EColumn style="width: 70%;">
                <EText style="color: #6b7280; font-size: 14px; margin: 0;">
                  Shipping
                </EText>
              </EColumn>
              <EColumn style="width: 30%; text-align: right;">
                <EText style="color: #6b7280; font-size: 14px; margin: 0;">
                  FREE
                </EText>
              </EColumn>
            </ERow>
            <ERow style="border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 12px;">
              <EColumn style="width: 70%;">
                <EText style="color: #6b7280; font-size: 14px; margin: 0;">
                  Tax
                </EText>
              </EColumn>
              <EColumn style="width: 30%; text-align: right;">
                <EText style="color: #6b7280; font-size: 14px; margin: 0;">
                  $28.00
                </EText>
              </EColumn>
            </ERow>
            <ERow>
              <EColumn style="width: 70%;">
                <EText style="color: #111827; font-size: 18px; font-weight: bold; margin: 0;">
                  Total
                </EText>
              </EColumn>
              <EColumn style="width: 30%; text-align: right;">
                <EText style="color: #111827; font-size: 18px; font-weight: bold; margin: 0;">
                  $377.98
                </EText>
              </EColumn>
            </ERow>
          </ESection>

          <!-- Shipping Address -->
          <ESection style="margin: 32px 0;">
            <EHeading
              as="h3"
              style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 12px 0;"
            >
              Shipping Address
            </EHeading>
            <EText style="color: #4b5563; font-size: 14px; line-height: 1.5; margin: 0;">
              Sarah Johnson<br>
              123 Main Street, Apt 4B<br>
              New York, NY 10001<br>
              United States
            </EText>
          </ESection>

          <!-- Track Order Button -->
          <ESection style="text-align: center; margin: 32px 0;">
            <EButton
              href="https://example.com/track-order/ORD-2024-001234"
              style="background-color: #10b981; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block; margin-right: 12px;"
            >
              Track Your Order
            </EButton>
            <EButton
              href="https://example.com/account/orders"
              style="background-color: transparent; color: #10b981; border: 2px solid #10b981; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block;"
            >
              View All Orders
            </EButton>
          </ESection>

          <!-- Help Section -->
          <ESection style="border-top: 1px solid #e5e7eb; padding-top: 24px; margin-top: 32px;">
            <EText style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 12px 0;">
              <strong>Questions about your order?</strong> We're here to help!
            </EText>
            <EText style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0;">
              Contact us at <ELink
                href="mailto:orders@example.com"
                style="color: #10b981;"
              >
                orders@example.com
              </ELink> or call 1-800-SHOP-NOW
            </EText>
          </ESection>
        </ESection>

        <!-- Footer -->
        <ESection style="background-color: #f8fafc; padding: 24px 40px; border-top: 1px solid #e5e7eb;">
          <EText style="color: #6b7280; font-size: 12px; text-align: center; margin: 0 0 8px 0;">
            Thank you for shopping with us!
          </EText>
          <EText style="color: #6b7280; font-size: 12px; text-align: center; margin: 0;">
            © 2024 Your Store. All rights reserved. | 456 Commerce St, Business City, BC 12345
          </EText>
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>
