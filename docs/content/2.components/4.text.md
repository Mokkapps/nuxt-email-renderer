---
title: Text
description: A paragraph text element optimized for email rendering.
navigation:
  icon: i-lucide-type
seo:
  title: Text Component - Nuxt Email Renderer
  description: Documentation for the EText component used for paragraph text in email templates.
---

A paragraph text component with default styling optimized for email clients. It provides consistent text rendering across different email environments.

## Installation

The `EText` component is automatically available when you install `nuxt-email-renderer`. No additional imports needed.

## Getting Started

Add the component to display text content in your emails:

```vue [emails/WelcomeEmail.vue]
<template>
  <EHtml>
    <EBody>
      <EContainer>
        <EText>
          Welcome to our platform! We're excited to have you on board.
        </EText>
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

## Props

The `EText` component accepts all standard HTML paragraph attributes and can be styled with inline styles.

## Default Styles

The component comes with email-optimized default styles:

```css
p {
  font-size: 14px;
  line-height: 24px;
  margin: 16px 0;
}
```

## Best Practices

::callout{type="info"}
**Font fallbacks**: Always specify web-safe font fallbacks like `Arial, Helvetica, sans-serif`.
::

::callout{type="warning"}
**Line height**: Use unitless line-height values or specific pixel values for better cross-client compatibility.
::

::callout{type="tip"}
**Color contrast**: Ensure sufficient contrast between text and background colors for accessibility.
::

### Recommended Text Styling

```vue
<template>
  <!-- Good: Web-safe fonts with fallbacks -->
  <EText
    style="
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #333333;
  "
  >
    Well-styled text
  </EText>

  <!-- Avoid: Custom fonts without fallbacks -->
  <EText
    style="
    font-family: 'CustomFont';
    font-size: 1.2rem;
    line-height: 150%;
  "
  >
    Avoid this styling
  </EText>
</template>
```

## Email Client Support

The text component is supported across all major email clients:

- ✅ Gmail (Desktop & Mobile)
- ✅ Apple Mail
- ✅ Outlook 2016+
- ✅ Yahoo Mail
- ✅ Thunderbird
- ✅ Samsung Email
- ✅ HEY

## Related Components

- [`EHeading`](/components/heading) - For titles and headings
- [`ELink`](/components/link) - For text links
- [`ECodeInline`](/components/code-inline) - For inline code text
- [`EContainer`](/components/container) - For text layout
