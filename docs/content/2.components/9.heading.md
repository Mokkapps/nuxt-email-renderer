---
title: Heading
description: Create semantic headings with customizable margins and styling.
navigation:
  icon: i-lucide-heading
seo:
  title: Heading Component - Nuxt Email Renderer
  description: Documentation for the EHeading component used to create headings in email templates.
---

Create semantic headings (h1-h6) with customizable margins and email-optimized styling. Perfect for titles, section headers, and content hierarchy.

## Installation

The `EHeading` component is automatically available when you install `nuxt-email-renderer`. No additional imports needed.

## Getting Started

Add headings to structure your email content:

```vue [emails/WelcomeEmail.vue]
<template>
  <EHtml>
    <EBody>
      <EContainer>
        <EHeading>Welcome to Our Platform!</EHeading>
        <EText>Thank you for joining us.</EText>
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

## Props

| Prop    | Type                                           | Default | Description                        |
| ------- | ---------------------------------------------- | ------- | ---------------------------------- |
| `as`    | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h1'`  | HTML heading tag to render         |
| `m`     | `string \| number`                             | -       | Margin on all sides                |
| `mx`    | `string \| number`                             | -       | Horizontal margin (left and right) |
| `my`    | `string \| number`                             | -       | Vertical margin (top and bottom)   |
| `mt`    | `string \| number`                             | -       | Top margin                         |
| `mr`    | `string \| number`                             | -       | Right margin                       |
| `mb`    | `string \| number`                             | -       | Bottom margin                      |
| `ml`    | `string \| number`                             | -       | Left margin                        |
| `style` | `CSSProperties \| string`                      | -       | Custom styling                     |


## Email Client Considerations

### Font Fallbacks

```vue
<template>
  <EHeading
    as="h1"
    style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"
  >
    Heading with Font Stack
  </EHeading>
</template>
```

### Outlook Compatibility

```vue
<template>
  <!-- Good: Simple, compatible styling -->
  <EHeading
    as="h1"
    style="
      font-size: 28px;
      color: #333333;
      font-weight: bold;
      margin: 0 0 20px 0;
      line-height: 1.2;
    "
  >
    Outlook-Compatible Heading
  </EHeading>

  <!-- Avoid: Complex transforms and effects -->
  <EHeading
    as="h1"
    style="
      transform: rotate(5deg);
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    "
  >
    Avoid This in Outlook
  </EHeading>
</template>
```

## Accessibility

### Proper Heading Hierarchy

```vue
<template>
  <!-- Good: Proper hierarchy -->
  <EContainer>
    <EHeading as="h1">Newsletter Title</EHeading>
    <EHeading as="h2">First Section</EHeading>
    <EHeading as="h3">Subsection</EHeading>
    <EHeading as="h2">Second Section</EHeading>
  </EContainer>

  <!-- Avoid: Skipping heading levels -->
  <EContainer>
    <EHeading as="h1">Newsletter Title</EHeading>
    <EHeading as="h4">Skipped h2 and h3</EHeading>
  </EContainer>
</template>
```

### Color Contrast

```vue
<template>
  <!-- Good: High contrast -->
  <EHeading style="color: #2c3e50; background-color: #ffffff;">
    High Contrast Heading
  </EHeading>

  <!-- Good: Dark background with light text -->
  <div style="background-color: #2c3e50; padding: 20px;">
    <EHeading style="color: #ffffff;"> Light Text on Dark Background </EHeading>
  </div>
</template>
```

## Email Client Support

- ✅ Gmail (Desktop & Mobile)
- ✅ Apple Mail
- ✅ Outlook 2016+
- ✅ Yahoo Mail
- ✅ Thunderbird
- ✅ Samsung Email
- ✅ HEY

## Related Components

- [`EText`](/components/text) - For body text content
- [`EContainer`](/components/container) - For heading layout
- [`ESection`](/components/section) - For content sections
