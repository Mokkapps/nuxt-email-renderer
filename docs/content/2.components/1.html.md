---
title: Html
description: The root HTML element that wraps your email content.
navigation:
  icon: i-lucide-code
seo:
  title: Html Component - Nuxt Email Renderer
  description: Documentation for the EHtml component used as the root element for email templates.
---

The root HTML element that wraps your entire email content. This is the fundamental component that should wrap all other email components.

## Installation

The `EHtml` component is automatically available when you install `nuxt-email-renderer`. No additional imports needed.

## Getting Started

Add the component to your email template as the root element:

```vue [emails/WelcomeEmail.vue]
<template>
  <EHtml>
    <EHead />
    <EBody>
      <!-- Your email content -->
    </EBody>
  </EHtml>
</template>
```

## Props

| Prop   | Type                       | Default | Description                       |
| ------ | -------------------------- | ------- | --------------------------------- |
| `lang` | `string`                   | `"en"`  | The language of the email content |
| `dir`  | `"ltr" \| "rtl" \| "auto"` | `"ltr"` | The text direction for the email  |

## Examples

### Basic Usage

```vue
<template>
  <EHtml>
    <EHead />
    <EBody>
      <EContainer>
        <EText>Hello World!</EText>
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

### Right-to-Left Languages

For Arabic, Hebrew, or other RTL languages:

```vue
<template>
  <EHtml lang="ar" dir="rtl">
    <EHead />
    <EBody>
      <EContainer>
        <EText>مرحبا بالعالم!</EText>
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

### Different Languages

```vue
<template>
  <EHtml lang="es">
    <EHead />
    <EBody>
      <EContainer>
        <EText>¡Hola Mundo!</EText>
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

## Best Practices

::callout{type="info"}
**Always use as root**: The `EHtml` component should always be the root element of your email template.
::

::callout{type="warning"}
**Language specification**: Always specify the correct `lang` prop for better accessibility and email client support.
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

- [`EHead`](/components/head) - Contains meta information and styles
- [`EBody`](/components/body) - Contains the visible email content
- [`EContainer`](/components/container) - Main content wrapper
