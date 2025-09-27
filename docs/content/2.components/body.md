---
title: Body
description: The main body element of your email.
navigation:
  icon: i-lucide-layout
seo:
  title: Body Component - Nuxt Email Renderer
  description: Documentation for the EBody component used as the main content area for email templates.
---

The main body element of your email that contains all visible content. It provides default styling optimized for email clients.

## Installation

The `EBody` component is automatically available when you install `nuxt-email-renderer`. No additional imports needed.

## Getting Started

Add the component inside `EHtml` to wrap your email content:

```vue [emails/WelcomeEmail.vue]
<template>
  <EHtml>
    <EHead />
    <EBody>
      <EContainer>
        <EText>Your email content goes here</EText>
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

## Props

The `EBody` component accepts all standard HTML body attributes and can be styled with inline styles or CSS classes.

## Default Styles

The `EBody` component comes with default styles optimized for email clients:

```css
body {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  line-height: 1.4;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}
```

## Best Practices

::callout{type="info"}
**Font families**: Always specify web-safe font fallbacks like `Arial, Helvetica, sans-serif`.
::

::callout{type="warning"}
**Background images**: Avoid background images as they're not supported in many email clients. Use solid colors instead.
::

::callout{type="tip"}
**Responsive design**: Use media queries within `EStyle` components for responsive behavior.
::

## Email Client Support

This component is supported across all major email clients:

- ✅ Gmail (Desktop & Mobile)
- ✅ Apple Mail
- ✅ Outlook 2016+
- ✅ Yahoo Mail
- ✅ Thunderbird
- ✅ Samsung Email
- ✅ HEY

## Related Components

- [`EHtml`](/components/html) - The root HTML element
- [`EHead`](/components/head) - Contains meta information and styles
- [`EContainer`](/components/container) - Main content wrapper
- [`EStyle`](/components/style) - Add CSS styles to your email
