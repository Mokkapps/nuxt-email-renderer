# Nuxt Email Renderer

**The next generation of writing emails in Nuxt.**

A Nuxt module that provides high-quality, unstyled components for creating emails using Vue and TypeScript. 

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

[📖 &nbsp;Documentation](https://nuxtemail.com) · [👾 &nbsp;Playground](https://nuxtemail.com/playground)

## Install

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-email-renderer
```

That's it! You can now use Nuxt Email Renderer in your Nuxt app ✨

## Getting started

Add the module to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: [
    'nuxt-email-renderer'
  ]
})
```

Create an email template using Vue components. Include styles where needed:

```vue
<template>
  <EHtml>
    <EHead />
    <EPreview>Welcome to our platform!</EPreview>
    <EBody :style="{ backgroundColor: '#f6f9fc', fontFamily: 'Arial, sans-serif' }">
      <EContainer :style="{ margin: '0 auto', padding: '20px 0 48px' }">
        <EHeading :as="'h1'">Welcome!</EHeading>
        <EText :style="{ fontSize: '16px', lineHeight: '24px' }">
          Thanks for joining us. Click the button below to get started.
        </EText>
        <EButton 
          href="https://example.com" 
          :style="{ backgroundColor: '#007ee6', color: '#fff', padding: '12px 20px' }"
        >
          Get Started
        </EButton>
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

In your code, you can now render the template by calling the render API endpoint provided by the module:

```ts
const response = await $fetch("/api/emails/render", {}, {
  method: "POST",
  body: {
    template: "WelcomeEmail",
    props: {
      userName: "John Doe",
      confirmationUrl: "https://example.com/confirm?token=abc123",
    },
  },
});
```

If you have the Nuxt DevTools enabled, you can also test rendering directly from the DevTools panel. You should see your `WelcomeEmail` template listed.

## Components

A set of standard components to help you build amazing emails without having to deal with the mess of creating table-based layouts and maintaining archaic markup.

- [Body](src/runtime/components/body) - The main body wrapper for your email
- [Button](src/runtime/components/button) - A styled button component
- [CodeBlock](src/runtime/components/code-block) - Syntax-highlighted code blocks  
- [CodeInline](src/runtime/components/code-inline) - Inline code snippets
- [Column](src/runtime/components/column) - Table column for layouts
- [Container](src/runtime/components/container) - Centered container wrapper
- [Font](src/runtime/components/font) - Web font imports
- [Head](src/runtime/components/head) - HTML head section
- [Heading](src/runtime/components/heading) - Headings (h1-h6)
- [Hr](src/runtime/components/hr) - Horizontal divider lines
- [Html](src/runtime/components/html) - Root HTML wrapper
- [Img](src/runtime/components/img) - Responsive images
- [Link](src/runtime/components/link) - Styled anchor links
- [Preview](src/runtime/components/preview) - Email preview text
- [Row](src/runtime/components/row) - Table rows for layouts
- [Section](src/runtime/components/section) - Content sections
- [Style](src/runtime/components/style) - CSS styles
- [Text](src/runtime/components/text) - Paragraph and text content

## Support

All components were tested using the most popular email clients.

| Gmail ✔ | Apple Mail ✔ | Outlook ✔ | Yahoo! Mail ✔ | HEY ✔ | Superhuman ✔ |
|---------|--------------|-----------|---------------|-------|--------------|

## Development

#### Install dependencies

```bash
pnpm install
```

#### Build

```bash
pnpm build
```

#### Run playground

```bash
pnpm dev
```

This will start the development server with the playground at [localhost:3000](http://localhost:3000/).

#### Run DevTools interface

```bash
pnpm client:dev
```

This starts the email template viewer interface at [localhost:3300](http://localhost:3300/).

#### Run tests

```bash
pnpm test
```

#### Run linting

```bash
pnpm lint
```

## Authors

- Michael Hoffmann ([@mokkapps](https://twitter.com/mokkapps))

## License

MIT License - see the [LICENSE](LICENSE) file for details.

---

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [📖 &nbsp;Documentation](https://nuxtemail.com)
- [🏀 &nbsp;Playground](https://nuxtemail.com/playground)


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-email-renderer/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-email-renderer

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-email-renderer.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-email-renderer

[license-src]: https://img.shields.io/npm/l/nuxt-email-renderer.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-email-renderer

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
