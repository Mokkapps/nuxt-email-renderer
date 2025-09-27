---
title: Column
description: Create columns within rows for multi-column email layouts.
navigation:
  icon: i-lucide-columns
seo:
  title: Column Component - Nuxt Email Renderer
  description: Documentation for the EColumn component used to create columns in email templates.
---

Create columns within rows for multi-column email layouts. Columns render as table cells optimized for email client compatibility.

## Installation

The `EColumn` component is automatically available when you install `nuxt-email-renderer`. No additional imports needed.

## Getting Started

Use columns inside rows to create horizontal layouts:

```vue [emails/WelcomeEmail.vue]
<template>
  <EHtml>
    <EBody>
      <EContainer>
        <ERow>
          <EColumn style="width: 50%;">
            <EText>First column content</EText>
          </EColumn>
          <EColumn style="width: 50%;">
            <EText>Second column content</EText>
          </EColumn>
        </ERow>
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

## Technical Details

The column component renders as a table cell (`<td>`) for maximum email client compatibility:

```html
<td role="presentation">
  <!-- Your content here -->
</td>
```

## Best Practices

::callout{type="info"}
**Width specification**: Always specify column widths as percentages for consistent layout.
::

::callout{type="warning"}
**Total width**: Ensure column widths add up to 100% within a row.
::

::callout{type="tip"}
**Mobile consideration**: Plan how columns will stack on mobile devices.
::

### Column Width Guidelines

```vue
<template>
  <!-- Good: Widths add up to 100% -->
  <ERow>
    <EColumn style="width: 30%;">30%</EColumn>
    <EColumn style="width: 70%;">70%</EColumn>
  </ERow>

  <!-- Good: Equal distribution -->
  <ERow>
    <EColumn style="width: 25%;">25%</EColumn>
    <EColumn style="width: 25%;">25%</EColumn>
    <EColumn style="width: 25%;">25%</EColumn>
    <EColumn style="width: 25%;">25%</EColumn>
  </ERow>

  <!-- Avoid: Widths over 100% -->
  <ERow>
    <EColumn style="width: 60%;">60%</EColumn>
    <EColumn style="width: 60%;">60% - This will cause issues</EColumn>
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

### Mobile Behavior

On mobile devices, most email clients will automatically stack columns vertically. You can control this with CSS:

```vue
<template>
  <EHtml>
    <EHead>
      <EStyle>
        @media screen and (max-width: 600px) { .stack-column { display: block
        !important; width: 100% !important; } }
      </EStyle>
    </EHead>
    <EBody>
      <ERow>
        <EColumn class="stack-column" style="width: 50%;">
          Stacks first on mobile
        </EColumn>
        <EColumn class="stack-column" style="width: 50%;">
          Stacks second on mobile
        </EColumn>
      </ERow>
    </EBody>
  </EHtml>
</template>
```

## Related Components

- [`ERow`](/components/row) - Container for columns
- [`EContainer`](/components/container) - Overall layout wrapper
- [`ESection`](/components/section) - Content sections within columns
