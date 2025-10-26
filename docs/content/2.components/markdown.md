---
title: Markdown
description: Render markdown content in your email templates with customizable styling.
navigation:
  icon: i-lucide-hash
seo:
  title: Markdown Component - Nuxt Email Renderer
  description: Documentation for the EMarkdown component used to render markdown content in email templates.
---

Render markdown content in your email templates with full styling control. Perfect for content-rich emails, newsletters, and documentation-style communications.

::component-preview
---
html: |
  <div>
    <h1 style="font-size: 32px; font-weight: 700; margin: 0 0 16px 0; color: #1a202c;">Welcome</h1>
    <p style="font-size: 14px; line-height: 24px; margin: 0 0 16px 0; color: #333;">This is <strong>bold</strong> text and <em>italic</em> text.</p>
    <h2 style="font-size: 24px; font-weight: 700; margin: 0 0 12px 0; color: #1a202c;">Features</h2>
    <ul style="margin: 0 0 16px 0; padding-left: 20px;">
      <li style="margin-bottom: 8px; color: #333;">Easy to use</li>
      <li style="margin-bottom: 8px; color: #333;">Fully customizable</li>
      <li style="margin-bottom: 8px; color: #333;">Email client compatible</li>
    </ul>
  </div>
title: Markdown Rendering
---
::

## Installation

The `EMarkdown` component is automatically available when you install `nuxt-email-renderer`. No additional imports needed.

## Getting Started

Add markdown content to your emails:

```vue [emails/NewsletterEmail.vue]
<template>
  <EHtml>
    <EBody>
      <EContainer>
        <EMarkdown source="# Welcome to our Newsletter

This is a **bold** announcement with *italic* text.

## Features
- Easy to use
- Fully customizable
- Email client compatible" />
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

## Using Slot Content

You can also pass markdown content through the default slot:

```vue [emails/BlogPost.vue]
<template>
  <EHtml>
    <EBody>
      <EContainer>
        <EMarkdown>
# Blog Post Title

This is the **introduction** to our blog post.

## Main Content

Here's some content with [a link](https://example.com) and `inline code`.

> This is a blockquote with important information.
        </EMarkdown>
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `source` | `string` | `undefined` | Markdown content to render. Alternative to using slot content. |
| `markdownCustomStyles` | `StylesType` | `undefined` | Custom styles for markdown elements. |
| `markdownContainerStyles` | `CSSProperties` | `undefined` | Styles for the container div wrapping the markdown content. |

## Custom Styling

Override default styles for specific markdown elements:

```vue [emails/StyledMarkdown.vue]
<script setup>
const customStyles = {
  h1: {
    color: '#2563eb',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem'
  },
  h2: {
    color: '#1f2937',
    fontSize: '1.5rem',
    fontWeight: '600',
    marginTop: '2rem',
    marginBottom: '0.5rem'
  },
  p: {
    color: '#374151',
    lineHeight: '1.6',
    marginBottom: '1rem'
  },
  blockQuote: {
    background: '#f3f4f6',
    borderLeft: '4px solid #2563eb',
    padding: '1rem',
    margin: '1rem 0',
    fontStyle: 'italic'
  },
  codeBlock: {
    background: '#1f2937',
    color: '#f9fafb',
    padding: '1rem',
    borderRadius: '0.5rem',
    fontFamily: 'Monaco, Consolas, monospace'
  },
  codeInline: {
    background: '#f3f4f6',
    color: '#dc2626',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    fontFamily: 'Monaco, Consolas, monospace'
  },
  link: {
    color: '#2563eb',
    textDecoration: 'underline'
  }
}

const containerStyles = {
  padding: '2rem',
  fontFamily: 'system-ui, sans-serif',
  maxWidth: '600px'
}
</script>

<template>
  <EHtml>
    <EBody>
      <EContainer>
        <EMarkdown 
          :markdownCustomStyles="customStyles"
          :markdownContainerStyles="containerStyles"
          source="# Custom Styled Content

This content uses **custom styling** for all elements." />
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

## Supported Markdown Elements

The EMarkdown component supports all standard markdown elements:

### Text Formatting
- **Bold text** (`**bold**` or `__bold__`)
- *Italic text* (`*italic*` or `_italic_`)
- ~~Strikethrough~~ (`~~strikethrough~~`)
- `Inline code` (`` `code` ``)

### Headings
- H1 through H6 (`# H1`, `## H2`, etc.)

### Lists
- Ordered lists (`1. Item`)
- Unordered lists (`- Item` or `* Item`)

### Links and Images
- Links (`[text](url)`)
- Images (`![alt](url)`)

### Code Blocks
````markdown
```language
code block content
```
````

### Blockquotes
```markdown
> This is a blockquote
> - Author
```

### Tables
```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

### Horizontal Rules
```markdown
---
```

## Available Style Properties

The `StylesType` interface includes styles for:

| Element | Description |
| --- | --- |
| `h1`, `h2`, `h3`, `h4`, `h5`, `h6` | Heading elements |
| `p` | Paragraph text |
| `bold`, `italic` | Text formatting |
| `strikethrough` | Strikethrough text |
| `link` | Hyperlinks |
| `codeBlock`, `codeInline` | Code formatting |
| `blockQuote` | Blockquotes |
| `ul`, `ol`, `li` | List elements |
| `table`, `thead`, `tbody`, `tr`, `th`, `td` | Table elements |
| `image` | Images |
| `hr` | Horizontal rules |
| `br` | Line breaks |

## Best Practices

::callout{type="info"}
**Content structure**: Use semantic markdown structure for better accessibility and rendering.
::

::callout{type="warning"}
**Email client compatibility**: Test complex markdown elements across different email clients.
::

::callout{type="tip"}
**Performance**: For large markdown content, consider pre-processing or chunking content.
::

## Email Client Support

- ✅ Gmail (Desktop & Mobile)
- ✅ Apple Mail
- ✅ Outlook 2016+ (basic markdown elements)
- ✅ Yahoo Mail
- ✅ Thunderbird
- ✅ Samsung Email
- ✅ HEY

### Client-Specific Notes

- **Outlook**: Limited support for advanced CSS. Stick to basic formatting for maximum compatibility.
- **Gmail**: Excellent support for most markdown elements and styling.
- **Mobile clients**: Ensure adequate font sizes and touch-friendly link spacing.

## Advanced Usage

### Dynamic Content

```vue [emails/DynamicContent.vue]
<script setup>
const blogPost = {
  title: 'Latest Blog Post',
  content: `## Introduction

This is a **dynamic** blog post loaded from your CMS.

### Key Points
- Point one
- Point two
- Point three

[Read more](https://example.com/blog/post)`
}

const brandStyles = {
  h2: { color: '#your-brand-color' },
  link: { color: '#your-brand-color' }
}
</script>

<template>
  <EHtml>
    <EBody>
      <EContainer>
        <EMarkdown 
          :source="`# ${blogPost.title}\n\n${blogPost.content}`"
          :markdownCustomStyles="brandStyles" />
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

### Newsletter Template

```vue [emails/Newsletter.vue]
<script setup>
const newsletterContent = `# Weekly Newsletter

## This Week's Highlights

We've got some **exciting updates** to share with you!

### New Features
1. Enhanced markdown support
2. Better email rendering
3. Improved accessibility

> "The best newsletters combine great content with excellent presentation." - Newsletter Expert

[View in browser](https://example.com/newsletter) | [Unsubscribe](https://example.com/unsubscribe)`

const newsletterStyles = {
  h1: { 
    textAlign: 'center',
    color: '#2563eb',
    borderBottom: '2px solid #e5e7eb',
    paddingBottom: '1rem'
  },
  blockQuote: {
    background: '#eff6ff',
    borderLeft: '4px solid #2563eb',
    fontStyle: 'italic',
    textAlign: 'center'
  }
}
</script>

<template>
  <EHtml>
    <EBody>
      <EContainer style="max-width: 600px; margin: 0 auto;">
        <EMarkdown 
          :source="newsletterContent"
          :markdownCustomStyles="newsletterStyles" />
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

## Related Components

- [`EText`](/components/text) - For simple text content
- [`ECodeBlock`](/components/code-block) - For dedicated code blocks
- [`ELink`](/components/link) - For standalone links
- [`EHeading`](/components/heading) - For individual headings
