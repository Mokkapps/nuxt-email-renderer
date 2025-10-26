---
title: CodeInline
description: An inline code component optimized for email client compatibility.
navigation:
  icon: i-lucide-code-2
seo:
  title: CodeInline Component - Nuxt Email Renderer
  description: Documentation for the ECodeInline component used to display inline code snippets in email templates.
---

An inline code component that renders code snippets within text content. The component uses a dual-rendering approach to ensure compatibility across different email clients, including Outlook.

::component-preview
---
html: |
  <p style="font-size: 14px; line-height: 24px; margin: 16px 0; color: #333333;">
    To install, run <code style="background-color: #f4f4f4; border-radius: 3px; font-family: 'Courier New', Courier, monospace; font-size: 13px; padding: 2px 6px;">npm install nuxt-email-renderer</code> in your terminal.
  </p>
title: Inline Code
---
::

## Installation

The `ECodeInline` component is automatically available when you install `nuxt-email-renderer`. No additional imports needed.

## Getting Started

Add the component to your email template within text content:

```vue [emails/DocumentationEmail.vue]
<template>
  <EHtml>
    <EBody>
      <EContainer>
        <EText>
          To install the package, run <ECodeInline>npm install nuxt-email-renderer</ECodeInline> in your terminal.
        </EText>
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `class` | `string` | `""` | CSS classes to apply to the code element |
| `style` | `CSSProperties` | - | Inline styles to apply to the code element |

## How It Works

The component uses a dual-rendering technique:
- Renders as `<code>` element for modern email clients
- Renders as `<span>` element as a fallback for clients that don't support the `<code>` tag
- Uses CSS to show/hide the appropriate version based on client capabilities

## Best Practices

::callout{type="info"}
**Use for short snippets**: Inline code is best for short code snippets, variable names, and commands.
::

::callout{type="tip"}
**Consistent styling**: Use consistent styling across your email to maintain visual hierarchy.
::

::callout{type="warning"}
**Test across clients**: The dual-rendering approach works well, but always test in your target email clients.
::

## Recommended Styling

```vue
<template>
  <ECodeInline
    :style="{
      fontFamily: 'Consolas, Monaco, monospace',
      backgroundColor: '#f6f8fa',
      color: '#24292f',
      padding: '2px 4px',
      borderRadius: '3px',
      fontSize: '85%'
    }"
  >
    your-code-here
  </ECodeInline>
</template>
```
