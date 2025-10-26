---
title: Link
description: Create clickable text links in your email templates.
navigation:
  icon: i-lucide-link
seo:
  title: Link Component - Nuxt Email Renderer
  description: Documentation for the ELink component used to create clickable links in email templates.
---

Create clickable text links in your email templates with consistent styling across email clients. Perfect for navigation, calls-to-action, and reference links.

::component-preview
---
html: |
  <a href="https://example.com" target="_blank" style="color: #007bff; text-decoration: underline;">
    Visit our website
  </a>
title: Basic Link
---
::

## Installation

The `ELink` component is automatically available when you install `nuxt-email-renderer`. No additional imports needed.

## Getting Started

Add clickable links to your email content:

```vue [emails/WelcomeEmail.vue]
<template>
  <EHtml>
    <EBody>
      <EContainer>
        <EText>
          Welcome! Please
          <ELink href="https://example.com/verify">verify your email</ELink> to
          continue.
        </EText>
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

## Props

| Prop     | Type     | Default    | Description                      |
| -------- | -------- | ---------- | -------------------------------- |
| `href`   | `string` | -          | **Required.** The URL to link to |
| `target` | `string` | `"_blank"` | Specifies where to open the link |

## Default Styles

The link component comes with email-optimized default styles:

```css
a {
  color: #067df7;
  text-decoration: none;
}
```

## Best Practices

::callout{type="info"}
**Descriptive text**: Use clear, descriptive link text that explains where the link goes.
::

::callout{type="warning"}
**Avoid generic text**: Don't use "click here" or "read more" without context.
::

::callout{type="tip"}
**Test thoroughly**: Always test links in different email clients to ensure they work correctly.
::

### Good Link Practices

```vue
<template>
  <!-- Good: Descriptive and clear -->
  <EText>
    <ELink href="https://example.com/reset-password">Reset your password</ELink>
  </EText>

  <!-- Good: Action-oriented -->
  <EText>
    <ELink href="https://example.com/download">Download the mobile app</ELink>
  </EText>

  <!-- Avoid: Generic text -->
  <EText>
    <ELink href="https://example.com/info">Click here</ELink>
  </EText>
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

### Client-Specific Considerations

- **Outlook**: May override link colors, always test
- **Gmail**: Excellent link support
- **Mobile clients**: Ensure links are touch-friendly (minimum 44px tap target)

## Accessibility

### Screen Reader Support

```vue
<template>
  <!-- Good: Context in link text -->
  <EText>
    <ELink href="https://example.com/report.pdf">
      Download Q1 2025 Financial Report (PDF, 2.3MB)
    </ELink>
  </EText>

  <!-- Good: Descriptive link -->
  <EText>
    Read more about our
    <ELink href="https://example.com/privacy">Privacy Policy</ELink>
  </EText>
</template>
```

## Related Components

- [`EButton`](/components/button) - For call-to-action buttons
- [`EText`](/components/text) - For link context
- [`EImg`](/components/img) - For linked images
