---
title: CodeBlock
description: A syntax-highlighted code block component with line numbers and highlighting support.
navigation:
  icon: i-lucide-code
seo:
  title: CodeBlock Component - Nuxt Email Renderer
  description: Documentation for the ECodeBlock component used to display syntax-highlighted code blocks in email templates.
---

A code block component that renders syntax-highlighted code with support for line numbers, line highlighting, and multiple themes. Built on top of Shiki for accurate syntax highlighting.

::component-preview
---
html: |
  <pre style="background-color: #f6f8fa; border-radius: 6px; font-family: 'Courier New', Courier, monospace; font-size: 13px; line-height: 1.5; margin: 16px 0; overflow-x: auto; padding: 16px;"><code style="color: #24292e;">console.log(<span style="color: #032f62;">'Hello World!'</span>);</code></pre>
title: Code Block
---
::

## Installation

The `ECodeBlock` component is automatically available when you install `nuxt-email-renderer`. No additional imports needed.

## Getting Started

Add the component to your email template:

```vue [emails/CodeExample.vue]
<template>
  <EHtml>
    <EBody>
      <EContainer>
        <ECodeBlock
          code="console.log('Hello World!');"
          lang="javascript"
          theme="github-light"
        />
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `code` | `string` | - | **Required.** The code content to display |
| `lang` | `BundledLanguage \| SpecialLanguage` | - | **Required.** The programming language for syntax highlighting |
| `theme` | `BundledTheme \| ThemeRegistrationAny` | - | **Required.** The color theme to use for highlighting |
| `class` | `string` | `""` | Additional CSS classes to apply |
| `showLineNumbers` | `boolean` | `false` | Whether to show line numbers |
| `lineNumberColor` | `string` | `"#636E7B"` | Color of the line numbers |
| `lineHighlightingColor` | `string` | `"rgba(101, 117, 133, .16)"` | Background color for highlighted lines |
| `highlightedLines` | `number[]` | `[]` | Array of line numbers to highlight |

## Examples

### Basic Code Block

```vue
<template>
  <ECodeBlock
    code="const greeting = 'Hello World!';
console.log(greeting);"
    lang="typescript"
    theme="github-dark"
  />
</template>
```

### With Line Numbers

```vue
<template>
  <ECodeBlock
    code="function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}"
    lang="javascript"
    theme="github-light"
    :show-line-numbers="true"
  />
</template>
```

### With Line Highlighting

```vue
<template>
  <ECodeBlock
    code="// This is line 1
const result = calculate(); // This line will be highlighted
return result;"
    lang="javascript"
    theme="github-light"
    :show-line-numbers="true"
    :highlighted-lines="[2]"
    line-highlighting-color="rgba(255, 255, 0, 0.2)"
  />
</template>
```

## Supported Languages

The component supports all languages available in Shiki, including:
- JavaScript, TypeScript
- Python, Java, C++, C#
- HTML, CSS, SCSS
- Vue, React (JSX)
- And many more...

## Supported Themes

Popular themes include:
- `github-light`, `github-dark`
- `vs`, `vs-dark`
- `dracula`, `nord`
- `one-dark-pro`, `material-theme`

## Best Practices

::callout{type="info"}
**Keep code concise**: Long code blocks may not render well in all email clients.
::

::callout{type="warning"}
**Test in email clients**: Syntax highlighting may not work consistently across all email clients.
::

::callout{type="tip"}
**Use fallback styling**: Consider providing fallback monospace font styling for email clients that don't support complex CSS.
::
