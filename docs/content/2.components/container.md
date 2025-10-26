---
title: Container
description: A centered container element to wrap email content.
navigation:
  icon: i-lucide-square
seo:
  title: Container Component - Nuxt Email Renderer
  description: Documentation for the EContainer component used to create centered content areas in email templates.
---

A responsive container component that centers your email content and provides optimal width constraints for different email clients.

::component-preview
---
html: |
  <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; padding: 20px;">
    <tbody>
      <tr>
        <td>
          <p style="font-size: 14px; line-height: 24px; margin: 0; color: #333333;">
            This content is centered and constrained to 600px width, providing an optimal reading experience across all devices.
          </p>
        </td>
      </tr>
    </tbody>
  </table>
title: Container with Content
---
::

## Installation

The `EContainer` component is automatically available when you install `nuxt-email-renderer`. No additional imports needed.

## Getting Started

Add the component to wrap your email content:

```vue [emails/WelcomeEmail.vue]
<template>
  <EHtml>
    <EBody>
      <EContainer>
        <EText>Your email content goes here</EText>
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

## Props

The `EContainer` component accepts all standard HTML table attributes and can be styled with CSS properties.

## Default Styles

The container comes with email-optimized defaults:

- **Max width**: `37.5em` (600px)
- **Alignment**: Centered
- **Width**: 100% (up to max-width)
- **Role**: `presentation` for accessibility

## Technical Details

The container component renders as a table-based layout for maximum email client compatibility:

```html
<table
  align="center"
  width="100%"
  role="presentation"
  cellspacing="0"
  cellpadding="0"
  border="0"
  style="max-width: 37.5em;"
>
  <tbody>
    <tr style="width: 100%">
      <td>
        <!-- Your content here -->
      </td>
    </tr>
  </tbody>
</table>
```

This structure ensures proper rendering across all email clients, including:

- Outlook (all versions)
- Gmail (desktop and mobile)
- Apple Mail
- Yahoo Mail
- Thunderbird

## Best Practices

::callout{type="info"}
**Consistent widths**: Use consistent max-width values across containers for visual harmony.
::

::callout{type="warning"}
**Avoid overflow**: Don't set widths larger than 600px to prevent horizontal scrolling on mobile devices.
::

::callout{type="tip"}
**Mobile-first**: Always test your containers on mobile devices and use media queries for responsive behavior.
::

## Email Client Support

The container component is supported across all major email clients:

- ✅ Gmail (Desktop & Mobile)
- ✅ Apple Mail
- ✅ Outlook 2016+
- ✅ Outlook Web App
- ✅ Yahoo Mail
- ✅ Thunderbird
- ✅ Samsung Email
- ✅ HEY

## Related Components

- [`ESection`](/components/section) - For content sections within containers
- [`ERow`](/components/row) and [`EColumn`](/components/column) - For grid layouts
- [`EBody`](/components/body) - The main email body wrapper
