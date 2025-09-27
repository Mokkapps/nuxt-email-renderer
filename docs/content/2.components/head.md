---
title: Head
description: The head element containing meta information for your email.
navigation:
  icon: i-lucide-info
seo:
  title: Head Component - Nuxt Email Renderer
  description: Documentation for the EHead component used to add meta information to email templates.
---

The head element that contains meta information, styles, and other non-visible content for your email. Essential for proper email rendering across different clients.

## Installation

The `EHead` component is automatically available when you install `nuxt-email-renderer`. No additional imports needed.

## Getting Started

Add the component inside `EHtml` before `EBody`:

```vue [emails/WelcomeEmail.vue]
<template>
  <EHtml>
    <EHead>
      <title>Welcome Email</title>
    </EHead>
    <EBody>
      <!-- Your email content -->
    </EBody>
  </EHtml>
</template>
```

## Default Meta Tags

The `EHead` component automatically includes essential meta tags:

- `Content-Type: text/html; charset=UTF-8`
- `x-apple-disable-message-reformatting` for Apple Mail

## Best Practices

::callout{type="info"}
**Always include**: The EHead component should always be included in your email templates for proper rendering.
::

::callout{type="warning"}
**Keep it simple**: Avoid complex meta tags that might not be supported by email clients.
::

## Email Client Support

- ✅ Gmail (Desktop & Mobile)
- ✅ Apple Mail
- ✅ Outlook 2016+
- ✅ Yahoo Mail
- ✅ Thunderbird
- ✅ Samsung Email
- ✅ HEY

## Related Components

- [`EHtml`](/components/html) - The root HTML element
- [`EStyle`](/components/style) - Add CSS styles
- [`EFont`](/components/font) - Load web fonts
- [`EPreview`](/components/preview) - Email preview text
