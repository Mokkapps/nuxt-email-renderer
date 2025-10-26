---
title: Button
description: A clickable button element styled for email compatibility.
navigation:
  icon: i-lucide-mouse-pointer-click
seo:
  title: Button Component - Nuxt Email Renderer
  description: Documentation for the EButton component used to create clickable buttons in email templates.
---

A clickable button component that renders as a styled link optimized for email client compatibility. The button automatically handles padding, styling, and Outlook-specific rendering quirks.

::component-preview
---
html: |
  <a href="https://example.com" target="_blank" style="line-height: 100%; text-decoration: none; display: inline-block; max-width: 100%; padding: 12px 24px; background-color: #007bff; color: #ffffff; border-radius: 6px; font-size: 16px; font-weight: 500;">
    <span style="max-width: 100%; display: inline-block; line-height: 120%;">Click me</span>
  </a>
title: Basic Button
---
::

## Installation

The `EButton` component is automatically available when you install `nuxt-email-renderer`. No additional imports needed.

## Getting Started

Add the component to your email template:

```vue [emails/WelcomeEmail.vue]
<template>
  <EHtml>
    <EBody>
      <EContainer>
        <EButton href="https://example.com"> Click me </EButton>
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

## Props

The `EButton` component accepts all standard HTML anchor attributes, plus custom styling:

| Prop     | Type                      | Default    | Description                                   |
| -------- | ------------------------- | ---------- | --------------------------------------------- |
| `href`   | `string`                  | -          | **Required.** The URL to link to when clicked |
| `target` | `string`                  | `"_blank"` | Specifies where to open the linked document   |
| `style`  | `CSSProperties \| string` | -          | Custom styling for the button                 |

### Style Properties

The button supports all CSS properties, with special handling for padding:

- `padding` - Overall padding (supports px, em, rem, %)
- `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft` - Individual padding values
- `backgroundColor` - Button background color
- `color` - Text color
- `borderRadius` - Button border radius
- `fontSize`, `fontWeight`, `fontFamily` - Text styling
- `textDecoration` - Text decoration (usually set to "none")

## Best Practices

::callout{type="info"}
**Always use href**: The button component requires an `href` attribute to function properly as a link.
::

::callout{type="warning"}
**Avoid JavaScript**: Email buttons should not contain JavaScript. Use simple links with tracking parameters instead.
::

::callout{type="tip"}
**Use fallback colors**: Always specify fallback colors that work without CSS for maximum compatibility.
::

### Recommended Button Styles

::component-preview
---
html: |
  <a href="https://example.com" target="_blank" style="line-height: 100%; text-decoration: none; display: inline-block; max-width: 100%; padding: 12px 24px; background-color: #007bff; color: #ffffff; border-radius: 6px; font-size: 16px; font-weight: 500;">
    <span style="max-width: 100%; display: inline-block; line-height: 120%;">Action Button</span>
  </a>
title: Recommended Style
---
::

```vue
<template>
  <!-- Good: Simple, compatible styling -->
  <EButton
    href="https://example.com"
    style="
      background-color: #007bff;
      color: #ffffff;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      display: inline-block;
    "
  >
    Action Button
  </EButton>

  <!-- Avoid: Complex gradients, shadows -->
  <EButton
    href="https://example.com"
    style="
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      transform: translateY(-2px);
    "
  >
    Avoid This
  </EButton>
</template>
```

## Email Client Support

The button component is thoroughly tested and optimized for:

- ✅ Gmail (Desktop & Mobile)
- ✅ Apple Mail
- ✅ Outlook 2016+ (with MSO-specific fixes)
- ✅ Yahoo Mail
- ✅ Thunderbird
- ✅ Samsung Email
- ✅ HEY

### Outlook Compatibility

The component automatically includes Outlook-specific fixes for proper padding and rendering:

- MSO conditional comments for padding
- Text raise adjustments
- Proper button rendering in Outlook

## Related Components

- [`ELink`](/components/link) - For simple text links
- [`EContainer`](/components/container) - For button layouts
- [`ERow`](/components/row) and [`EColumn`](/components/column) - For button groups
