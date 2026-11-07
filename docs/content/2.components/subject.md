---
title: Subject
description: A component for defining the email subject line directly within the template.
navigation:
  icon: i-lucide-mail
seo:
  title: Subject Component - Nuxt Email Renderer
  description: Documentation for the ESubject component used to set email subject lines within templates.
---

A subject component that allows you to define the email subject line directly within your email template. This keeps the subject and content together, making it easier to maintain consistency and avoid sync issues.

## Installation

The `ESubject` component is automatically available when you install `nuxt-email-renderer`. No additional imports needed.

## Getting Started

Add the component to your email template, typically near the top after `<EHtml>`:

```vue [emails/WelcomeEmail.vue]
<template>
  <EHtml>
    <ESubject>Welcome to {{ companyName }}!</ESubject>
    <EHead />
    <EBody>
      <EContainer>
        <!-- Your email content -->
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

## Props

The `ESubject` component doesn't accept any props. The subject text is defined through the component's slot content and supports Vue template interpolation.

## Usage with renderEmailComponent

When you render an email template that includes `<ESubject>`, the result contains its text as `subject`. Templates without it return no `subject`:

```ts
const { html, subject } = await renderEmailComponent('WelcomeEmail', {
  companyName: 'Acme Corp'
})
// html: "<!DOCTYPE html>..."
// subject: "Welcome to Acme Corp!"

const { subject: none } = await renderEmailComponent('Newsletter')
// none: undefined
```

## Dynamic Subject Lines

Use Vue template syntax to create dynamic subject lines based on props:

```vue [emails/OrderConfirmation.vue]
<script setup lang="ts">
interface Props {
  orderNumber: string
  customerName: string
}
const { orderNumber, customerName } = defineProps<Props>()
</script>

<template>
  <EHtml>
    <ESubject>Order #{{ orderNumber }} confirmed, {{ customerName }}!</ESubject>
    <EBody>
      <!-- Email content -->
    </EBody>
  </EHtml>
</template>
```

## HTML Entity Decoding

The component automatically decodes HTML entities in the subject line, ensuring special characters display correctly:

```vue
<!-- Template -->
<ESubject>Welcome to Procter &amp; Gamble!</ESubject>

<!-- Result -->
{ subject: "Welcome to Procter & Gamble!" }
```

Common entities that are decoded:
- `&amp;` → `&`
- `&lt;` → `<`
- `&gt;` → `>`
- `&quot;` → `"`
- `&#39;` or `&apos;` → `'`

## How It Works

The component:
- Renders nothing visually (completely invisible in the email)
- Captures the subject text during template rendering
- Supports full Vue template interpolation
- Automatically decodes HTML entities for proper display
- Maintains backward compatibility (templates without ESubject still work)

## Best Practices

::callout{type="info"}
**Keep it under 50 characters**: Most email clients display 50-60 characters of subject lines on desktop and less on mobile.
::

::callout{type="tip"}
**Make it compelling**: Use action words and create urgency or curiosity to improve open rates.
::

::callout{type="warning"}
**Test with different props**: Ensure dynamic subjects work well with all possible prop values.
::

### Good Subject Line Examples

```vue
<!-- Personalized welcome -->
<ESubject>Welcome to {{ companyName }}, {{ userName }}! 🎉</ESubject>

<!-- Transactional -->
<ESubject>Your {{ productName }} order ships today</ESubject>

<!-- Newsletter -->
<ESubject>Weekly digest: {{ topStoryCount }} stories you missed</ESubject>

<!-- Reminder -->
<ESubject>{{ daysRemaining }} days left on your free trial</ESubject>
```

### What to Avoid

```vue
<!-- Too long (will be cut off) -->
<ESubject>
  We're excited to announce our new product launch with amazing features
</ESubject>

<!-- All caps (looks spammy) -->
<ESubject>BUY NOW - LIMITED TIME OFFER!!!</ESubject>

<!-- Too generic -->
<ESubject>Newsletter</ESubject>

<!-- Excessive punctuation -->
<ESubject>Check this out!!!</ESubject>
```

## Email Client Support

Subject lines are universally supported by all email clients. The `ESubject` component simply provides a convenient way to define them within your Vue templates.

## Technical Details

The component:
- Uses Vue's provide/inject pattern to capture the subject
- Renders `null` to avoid any visual output
- Processes the subject during SSR rendering
- Decodes HTML entities using a built-in decoder
- Works seamlessly with i18n and other Vue features
