---
title: Section
description: Create content sections with table-based layout for email compatibility.
navigation:
  icon: i-lucide-rectangle-horizontal
seo:
  title: Section Component - Nuxt Email Renderer
  description: Documentation for the ESection component used to create content sections in email templates.
---

Create content sections using table-based layout optimized for email client compatibility. Perfect for organizing content into distinct areas with consistent spacing.

::component-preview
---
html: |
  <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f9fafb;">
    <tbody>
      <tr>
        <td style="padding: 20px;">
          <h2 style="margin: 0 0 10px 0; font-size: 24px; color: #1a202c;">Welcome Section</h2>
          <p style="margin: 0; font-size: 14px; color: #333;">This content is organized within a section with padding and background color.</p>
        </td>
      </tr>
    </tbody>
  </table>
title: Section with Background
---
::

## Installation

The `ESection` component is automatically available when you install `nuxt-email-renderer`. No additional imports needed.

## Getting Started

Use sections to organize your email content:

```vue [emails/WelcomeEmail.vue]
<template>
  <EHtml>
    <EBody>
      <EContainer>
        <ESection style="padding: 20px;">
          <EHeading>Welcome Section</EHeading>
          <EText>This content is in a section.</EText>
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

## Technical Details

The section component renders as a table for maximum email client compatibility:

```html
<table
  align="center"
  width="100%"
  border="0"
  cellpadding="0"
  cellspacing="0"
  role="presentation"
>
  <tbody>
    <tr>
      <td>
        <!-- Your content here -->
      </td>
    </tr>
  </tbody>
</table>
```

## Best Practices

::callout{type="info"}
**Consistent spacing**: Use consistent padding across sections for visual harmony.
::

::callout{type="warning"}
**Background images**: Test background images carefully as support varies across email clients.
::

::callout{type="tip"}
**Mobile optimization**: Always consider how sections will look on mobile devices.
::

### Section Hierarchy

```vue
<template>
  <EContainer>
    <!-- Primary section -->
    <ESection style="padding: 30px;">
      <EHeading as="h1">Main Section</EHeading>
    </ESection>

    <!-- Secondary sections -->
    <ESection style="padding: 20px;">
      <EHeading as="h2">Sub Section</EHeading>
    </ESection>

    <!-- Minor sections -->
    <ESection style="padding: 15px;">
      <EHeading as="h3">Minor Section</EHeading>
    </ESection>
  </EContainer>
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

- [`EContainer`](/components/container) - For section grouping
- [`ERow`](/components/row) and [`EColumn`](/components/column) - For section layouts
- [`EHeading`](/components/heading) and [`EText`](/components/text) - For section content
