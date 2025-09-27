---
title: Style
description: A component for adding custom CSS styles to email templates.
navigation:
  icon: i-lucide-paintbrush
seo:
  title: Style Component - Nuxt Email Renderer
  description: Documentation for the EStyle component used to add custom CSS styles to email templates.
---

A style component that allows you to add custom CSS styles to your email templates. The component renders a `<style>` tag with a unique identifier for proper email rendering.

## Installation

The `EStyle` component is automatically available when you install `nuxt-email-renderer`. No additional imports needed.

## Getting Started

Add the component to your email template, typically within the `<EHead>` section:

```vue [emails/StyledEmail.vue]
<template>
  <EHtml>
    <EHead>
      <EStyle>
        .custom-button {
          background-color: #007bff;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 4px;
          display: inline-block;
        }
        
        .highlight {
          background-color: #fff3cd;
          padding: 8px;
          border-left: 4px solid #ffc107;
        }
      </EStyle>
    </EHead>
    <EBody>
      <EContainer>
        <div class="highlight">
          <EText>This is highlighted content!</EText>
        </div>
        <EButton href="https://example.com" class="custom-button">
          Custom Styled Button
        </EButton>
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

## Props

The `EStyle` component doesn't accept any props. CSS content is provided through the component's slot.

## Best Practices

::callout{type="warning"}
**Email client limitations**: Not all CSS properties work across email clients. Test thoroughly.
::

::callout{type="info"}
**Use !important**: Email clients often override styles, so use `!important` for critical styling.
::

::callout{type="tip"}
**Inline styles as backup**: Always provide inline styles as fallbacks for important elements.
::

### Email-Safe CSS Properties

✅ **Well Supported:**
- `background-color`, `color`
- `font-family`, `font-size`, `font-weight`
- `padding`, `margin`
- `text-align`, `text-decoration`
- `border`, `border-radius` (limited)

⚠️ **Limited Support:**
- `box-shadow`
- `transform`, `transition`
- `position` (except `relative`)
- Flexbox, Grid

❌ **Poor Support:**
- `@keyframes` animations
- `::before`, `::after` pseudo-elements
- Complex selectors

## Technical Details

The component:
- Renders a `<style>` tag with `data-id="__nuxt-email-style"`
- Accepts any valid CSS through its slot content
- Should typically be placed within `<EHead>` for proper rendering
- Supports all CSS syntax, though email client support varies
