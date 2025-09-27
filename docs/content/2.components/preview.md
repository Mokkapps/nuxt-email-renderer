---
title: Preview
description: A component for defining the preview text that appears in email client inboxes.
navigation:
  icon: i-lucide-eye
seo:
  title: Preview Component - Nuxt Email Renderer
  description: Documentation for the EPreview component used to set preview text for email templates.
---

A preview text component that defines the text snippet shown in email client inboxes and notification previews. This text appears after the subject line in most email clients and is crucial for email engagement.

## Installation

The `EPreview` component is automatically available when you install `nuxt-email-renderer`. No additional imports needed.

## Getting Started

Add the component to your email template, typically right after the opening `<EBody>` tag:

```vue [emails/WelcomeEmail.vue]
<template>
  <EHtml>
    <EHead />
    <EBody>
      <EPreview>Welcome to our platform! Get started with your free account today.</EPreview>
      <EContainer>
        <!-- Your email content -->
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

## Props

The `EPreview` component doesn't accept any props. The preview text is defined through the component's slot content.

## How It Works

The component:
- Renders the preview text invisibly within the email
- Limits text to 150 characters for optimal display
- Adds hidden whitespace characters to prevent email clients from showing additional content in the preview
- Uses CSS to hide the content from visual display while keeping it accessible to email clients

## Best Practices

::callout{type="info"}
**Keep it under 150 characters**: Preview text is automatically truncated at 150 characters for optimal display.
::

::callout{type="tip"}
**Make it compelling**: Use preview text to complement your subject line and encourage opens.
::

::callout{type="warning"}
**Avoid duplication**: Don't repeat your subject line in the preview text - use it to provide additional context.
::

### Good Preview Text Examples

```vue
<!-- E-commerce order confirmation -->
<EPreview>Order #12345 confirmed - estimated delivery: March 15th. Track your package anytime.</EPreview>

<!-- Newsletter -->
<EPreview>This week: 5 productivity tips, new product launches, and an exclusive discount code inside.</EPreview>

<!-- Welcome email -->
<EPreview>Thanks for joining! Here's everything you need to know to get started with your account.</EPreview>

<!-- Password reset -->
<EPreview>Reset requested from Chrome on Windows. If this wasn't you, please ignore this email.</EPreview>
```

### What to Avoid

```vue
<!-- Too generic -->
<EPreview>Newsletter</EPreview>

<!-- Repeats subject line -->
<EPreview>Welcome to Our Service</EPreview> <!-- if subject is already "Welcome to Our Service" -->

<!-- Too long (will be cut off) -->
<EPreview>
  We're excited to announce our new product launch with amazing features that will revolutionize the way you work and help you achieve more productivity than ever before with our innovative solutions.
</EPreview>
```

## Email Client Support

Preview text is supported by most major email clients:
- ✅ Gmail, Outlook, Apple Mail
- ✅ Yahoo Mail, Thunderbird
- ✅ Mobile email apps (iOS Mail, Android Gmail)
- ⚠️ Some older email clients may not display preview text

## Technical Details

The component automatically:
- Truncates content to 150 characters
- Adds hidden whitespace characters to prevent content bleeding
- Uses CSS to hide the element from visual display
- Maintains accessibility for screen readers when needed
