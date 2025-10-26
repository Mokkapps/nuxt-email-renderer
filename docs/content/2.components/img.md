---
title: Image
description: Display images in your email templates with email client optimization.
navigation:
  icon: i-lucide-image
seo:
  title: Image Component - Nuxt Email Renderer
  description: Documentation for the EImg component used to display images in email templates.
---

Display images in your email templates with automatic optimization for email client compatibility. The component handles proper styling and attributes for maximum deliverability.

::component-preview
---
html: |
  <img src="https://via.placeholder.com/300x200/007bff/ffffff?text=Email+Image" alt="Example Image" width="300" height="200" style="display: block; outline: none; border: none; text-decoration: none;" />
title: Basic Image
---
::

## Installation

The `EImg` component is automatically available when you install `nuxt-email-renderer`. No additional imports needed.

## Getting Started

Add images to your email templates:

```vue [emails/WelcomeEmail.vue]
<template>
  <EHtml>
    <EBody>
      <EContainer>
        <EImg
          src="https://example.com/logo.png"
          alt="Company Logo"
          :width="200"
          :height="60"
        />
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `src` | `string` | ✅ | Image source URL |
| `alt` | `string` | ❌ | Alternative text for accessibility |
| `width` | `string \| number` | ❌ | Image width in pixels |
| `height` | `string \| number` | ❌ | Image height in pixels |

## Image Optimization Tips

### File Formats
- **JPEG**: Best for photographs
- **PNG**: Best for logos and graphics with transparency
- **GIF**: For simple animations (limited support)
- **WebP**: Not widely supported in email clients

### Size Recommendations
- **Maximum width**: 600px for main content
- **File size**: Keep under 100KB per image
- **Total email size**: Under 102KB for best deliverability

### Hosting
```vue
<template>
  <!-- Good: Use absolute URLs -->
  <EImg
    src="https://cdn.example.com/images/logo.png"
    alt="Company Logo"
  />
  
  <!-- Avoid: Relative paths don't work in email -->
  <EImg
    src="/images/logo.png"
    alt="Company Logo"
  />
</template>
```

## Accessibility

### Alt Text Best Practices

```vue
<template>
  <!-- Good: Descriptive alt text -->
  <EImg
    src="https://example.com/sale-banner.jpg"
    alt="50% off summer collection - Shop now"
  />
  
  <!-- Good: Empty alt for decorative images -->
  <EImg
    src="https://example.com/decorative-border.png"
    alt=""
  />
  
  <!-- Avoid: Generic alt text -->
  <EImg
    src="https://example.com/product.jpg"
    alt="image"
  />
</template>
```

## Responsive Design

```vue
<template>
  <EHtml>
    <EHead>
      <EStyle>
        @media screen and (max-width: 600px) {
          .responsive-img {
            width: 100% !important;
            height: auto !important;
          }
        }
      </EStyle>
    </EHead>
    <EBody>
      <EImg
        class="responsive-img"
        src="https://example.com/banner.jpg"
        alt="Newsletter Banner"
        :width="600"
        :height="200"
      />
    </EBody>
  </EHtml>
</template>
```

## Email Client Support

- ✅ Gmail (Desktop & Mobile)
- ✅ Apple Mail
- ✅ Outlook 2016+ (with some limitations)
- ✅ Yahoo Mail
- ✅ Thunderbird
- ✅ Samsung Email
- ✅ HEY

### Outlook Considerations
- Always specify width and height
- Avoid CSS transforms and advanced positioning
- Test images in Outlook preview

## Related Components

- [`ELink`](/components/link) - For clickable images
- [`EContainer`](/components/container) - For image layout
- [`ERow`](/components/row) and [`EColumn`](/components/column) - For image grids
