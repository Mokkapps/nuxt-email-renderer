---
title: Horizontal Rule
description: Create visual separators and dividers in your email content.
navigation:
  icon: i-lucide-minus
seo:
  title: HR Component - Nuxt Email Renderer
  description: Documentation for the EHr component used to create horizontal dividers in email templates.
---

Create visual separators and dividers in your email content with the horizontal rule component. Perfect for separating sections and improving content organization.

::component-preview
---
html: |
  <hr style="width: 100%; border: none; border-top: 1px solid #eaeaea; margin: 26px 0;" />
title: Horizontal Rule
---
::

## Installation

The `EHr` component is automatically available when you install `nuxt-email-renderer`. No additional imports needed.

## Getting Started

Add horizontal dividers to separate content:

```vue [emails/WelcomeEmail.vue]
<template>
  <EHtml>
    <EBody>
      <EContainer>
        <EText>First section content</EText>
        <EHr />
        <EText>Second section content</EText>
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

## Default Styles

The HR component comes with email-optimized default styles:

```css
hr {
  width: 100%;
  border: none;
  border-top: 1px solid #eaeaea;
}
```

## Best Practices

::callout{type="info"}
**Consistent spacing**: Use consistent margin values for dividers throughout your email.
::

::callout{type="warning"}
**Border support**: Stick to solid borders for maximum email client compatibility.
::

::callout{type="tip"}
**Color coordination**: Match divider colors to your brand palette for cohesive design.
::

## Email Client Support

- ✅ Gmail (Desktop & Mobile)
- ✅ Apple Mail
- ✅ Outlook 2016+ (solid borders recommended)
- ✅ Yahoo Mail
- ✅ Thunderbird
- ✅ Samsung Email
- ✅ HEY

### Client-Specific Notes

- **Outlook**: Stick to solid borders for best compatibility
- **Gmail**: Excellent support for all border styles
- **Mobile clients**: Dividers help improve content scannability on small screens

## Related Components

- [`ESection`](/components/section) - For content sections
- [`EContainer`](/components/container) - For divider spacing
- [`EText`](/components/text) - For content around dividers
