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

## Dark mode

Nuxt Email Renderer does not automatically generate dark mode styles or detect the recipient's color preference. `EStyle` preserves the CSS you provide, including `@media (prefers-color-scheme: dark)` rules. The email client decides whether to apply those rules.

Define light mode fallback colors inline and add your dark mode overrides in `EStyle`. You can also declare the supported color schemes with metadata in `EHead`; the module does not add this metadata automatically.

```vue [emails/DarkModeEmail.vue]
<template>
  <EHtml>
    <EHead>
      <meta name="color-scheme" content="light dark">
      <meta name="supported-color-schemes" content="light dark">
      <EStyle>
        @media (prefers-color-scheme: dark) {
          .email-content {
            background-color: #1a1a1a !important;
          }
          .email-text {
            color: #ffffff !important;
          }
        }
      </EStyle>
    </EHead>
    <EBody>
      <EContainer class="email-content" style="background-color: #ffffff;">
        <EText class="email-text" style="color: #1a1a1a;">
          Your order has shipped.
        </EText>
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

::callout{type="warning"}
Dark mode behavior varies between email clients. Some ignore the media query or automatically adjust colors. These styles and metadata do not guarantee the same appearance everywhere; test the rendered email in the clients your recipients use. See the [email client support for `prefers-color-scheme`](https://www.caniemail.com/features/css-at-media-prefers-color-scheme/).
::

## Sharing CSS Variables from Your Website

You can share CSS custom properties (variables), font declarations, or resets between your main website and email templates using two approaches:

### Option 1: Import a CSS file per template with `?inline`

Use the `?inline` suffix to import any local CSS file as a raw string and pass it to `EStyle`:

```vue [emails/BrandedEmail.vue]
<script setup lang="ts">
import brandCss from '~/assets/css/variables.css?inline'
</script>

<template>
  <EHtml>
    <EHead>
      <EStyle>{{ brandCss }}</EStyle>
    </EHead>
    <EBody>
      <EContainer>
        <EText style="color: var(--color-primary);">
          This text uses your brand color!
        </EText>
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

### Option 2: Inject CSS globally for all templates

Use the `globalCss` module option to automatically inject CSS into every email template:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['nuxt-email-renderer'],

  nuxtEmailRenderer: {
    globalCss: ['assets/css/variables.css'],
  },
})
```

The specified CSS files are read at build time and injected as a `<style>` tag with `data-id="__nuxt-email-global-style"` in the `<head>` of every rendered email. When multiple files are specified, their contents are concatenated **in array order** — so later entries can override earlier ones using CSS specificity or cascade rules.

::callout{type="info"}
**Relative paths**: Paths in `globalCss` are resolved relative to your Nuxt project root. Both `assets/css/variables.css` and `./assets/css/variables.css` are supported.
::

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
