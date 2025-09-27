---
title: Font
description: A component for defining and loading custom fonts in email templates.
navigation:
  icon: i-lucide-type
seo:
  title: Font Component - Nuxt Email Renderer
  description: Documentation for the EFont component used to define custom fonts and fallbacks in email templates.
---

A font component that defines custom fonts with proper fallbacks for email compatibility. It generates CSS `@font-face` rules and applies font families globally within your email template.

## Installation

The `EFont` component is automatically available when you install `nuxt-email-renderer`. No additional imports needed.

## Getting Started

Add the component to your email template, typically within the `<EHead>` section:

```vue [emails/CustomFontEmail.vue]
<template>
  <EHtml>
    <EHead>
      <EFont
        font-family="Inter"
        :fallback-font-family="['Arial', 'sans-serif']"
        :web-font="{ url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700', format: 'woff2' }"
      />
    </EHead>
    <EBody>
      <EContainer>
        <EText>This text will use the Inter font with Arial fallback.</EText>
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `fontFamily` | `string` | - | **Required.** The name of the custom font family |
| `fallbackFontFamily` | `FallbackFont \| FallbackFont[]` | `"Arial"` | Fallback fonts to use if custom font fails to load |
| `webFont` | `{ url: string, format: FontFormat }` | - | Web font configuration with URL and format |
| `fontStyle` | `"normal" \| "italic" \| "oblique"` | `"normal"` | Font style for the @font-face rule |
| `fontWeight` | `"normal" \| "bold" \| "bolder" \| "lighter" \| number` | `400` | Font weight for the @font-face rule |

### Supported Fallback Fonts

- `Arial`
- `Helvetica` 
- `Verdana`
- `Georgia`
- `Times New Roman`
- `serif`
- `sans-serif`
- `monospace`
- `cursive`
- `fantasy`

### Supported Font Formats

- `woff`
- `woff2`
- `truetype`
- `opentype`
- `embedded-opentype`
- `svg`

## Examples

### Google Fonts Integration

```vue
<template>
  <EHead>
    <EFont
      font-family="Roboto"
      :fallback-font-family="['Arial', 'sans-serif']"
      :web-font="{ 
        url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700', 
        format: 'woff2' 
      }"
      :font-weight="400"
    />
  </EHead>
</template>
```

## Best Practices

::callout{type="warning"}
**Email client limitations**: Many email clients don't support web fonts. Always provide appropriate fallbacks.
::

::callout{type="info"}
**Outlook compatibility**: The component includes MSO-specific font declarations for better Outlook support.
::

::callout{type="tip"}
**Performance**: Limit the number of font variants to improve email loading performance.
::

## Font Loading Strategy

The component automatically:
1. Generates CSS `@font-face` rules for web fonts
2. Applies the font family globally to all elements (`*`)
3. Includes MSO-specific fallbacks for Outlook
4. Handles multiple fallback fonts in order of preference
