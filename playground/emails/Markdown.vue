<script setup lang="ts">
const styles = {
  main: {
    backgroundColor: '#fff',
    color: '#212121',
  },
  container: {
    padding: '20px',
    margin: '0 auto',
    backgroundColor: '#eee',
  },
  section: {
    backgroundColor: '#fff',
  },
  markdown: {
    padding: '20px',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
    color: '#333',
    lineHeight: '1.6',
  },
}

const markdown = `# Markdown Test Document

This is a **test document** to check the capabilities of a Markdown parser.

## Headings

### Third-Level Heading

#### Fourth-Level Heading

##### Fifth-Level Heading

###### Sixth-Level Heading

## Text Formatting

This is some **bold text** and this is some *italic text*. You can also use ~~strikethrough~~ and \`inline code\`.

## Lists

1. Ordered List Item 1
2. Ordered List Item 2
3. Ordered List Item 3

- Unordered List Item 1
- Unordered List Item 2
- Unordered List Item 3

## Links

[Markdown Guide](https://www.markdownguide.org)

## Images

![Markdown Logo](https://markdown-here.com/img/icon256.png)

## Blockquotes

> This is a blockquote.
> - Author

## Code Blocks

\`\`\`javascript
function greet(name) {
console.log(\`Hello, $\{name}!\`);
}
\`\`\``
</script>

<template>
  <EHtml>
    <EHead />
    <EBody :style="styles.main">
      <EPreview>Markdown</EPreview>
      <EContainer :style="styles.container">
        <ESection :style="styles.section">
          <EMarkdown
            :source="markdown"
            :style="styles.markdown"
          />
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>
