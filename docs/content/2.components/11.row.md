---
title: Row
description: Create horizontal layouts using table rows for email compatibility.
navigation:
  icon: i-lucide-rows
seo:
  title: Row Component - Nuxt Email Renderer
  description: Documentation for the ERow component used to create horizontal layouts in email templates.
---

Create horizontal layouts using table-based rows optimized for email client compatibility. Perfect for creating multi-column layouts and organizing content horizontally.

## Installation

The `ERow` component is automatically available when you install `nuxt-email-renderer`. No additional imports needed.

## Getting Started

Use rows with columns to create horizontal layouts:

```vue [emails/WelcomeEmail.vue]
<template>
  <EHtml>
    <EBody>
      <EContainer>
        <ERow>
          <EColumn>
            <EText>Left Column</EText>
          </EColumn>
          <EColumn>
            <EText>Right Column</EText>
          </EColumn>
        </ERow>
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

## Technical Details

The row component renders as a table for maximum email client compatibility:

```html
<table
  align="center"
  width="100%"
  border="0"
  cellpadding="0"
  cellspacing="0"
  role="presentation"
>
  <tbody style="width: 100%">
    <tr style="width: 100%">
      <!-- EColumn components render as <td> elements -->
    </tr>
  </tbody>
</table>
```

## Best Practices

::callout{type="info"}
**Column widths**: Always specify column widths as percentages for better responsiveness.
::

::callout{type="warning"}
**Mobile stacking**: Plan for how columns will stack on mobile devices.
::

::callout{type="tip"}
**Consistent padding**: Use consistent padding in columns for visual alignment.
::

### Column Width Guidelines

```vue
<template>
  <!-- Two columns -->
  <ERow>
    <EColumn style="width: 50%;">50% width</EColumn>
    <EColumn style="width: 50%;">50% width</EColumn>
  </ERow>

  <!-- Three columns -->
  <ERow>
    <EColumn style="width: 33.33%;">33.33% width</EColumn>
    <EColumn style="width: 33.33%;">33.33% width</EColumn>
    <EColumn style="width: 33.33%;">33.33% width</EColumn>
  </ERow>

  <!-- Asymmetric layout -->
  <ERow>
    <EColumn style="width: 25%;">Sidebar</EColumn>
    <EColumn style="width: 75%;">Main content</EColumn>
  </ERow>
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

### Mobile Considerations

Most email clients will automatically stack columns on mobile devices. You can control this behavior with media queries:

```vue
<template>
  <EHtml>
    <EHead>
      <EStyle>
        @media screen and (max-width: 600px) { .mobile-stack { display: block
        !important; width: 100% !important; text-align: center !important; } }
      </EStyle>
    </EHead>
    <EBody>
      <ERow>
        <EColumn class="mobile-stack" style="width: 50%;"> Content 1 </EColumn>
        <EColumn class="mobile-stack" style="width: 50%;"> Content 2 </EColumn>
      </ERow>
    </EBody>
  </EHtml>
</template>
```

## Related Components

- [`EColumn`](/components/column) - Individual columns within rows
- [`EContainer`](/components/container) - Row container wrapper
- [`ESection`](/components/section) - Content sections
