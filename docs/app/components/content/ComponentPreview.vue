<template>
  <div class="component-preview">
    <div
      v-if="title"
      class="preview-header"
    >
      <span class="preview-title">{{ title }}</span>
    </div>
    <div class="preview-container">
      <iframe
        :srcdoc="iframeContent"
        class="preview-iframe"
        sandbox="allow-same-origin"
        title="Component Preview"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** The rendered HTML to display */
  html: string
  /** Optional title for the preview */
  title?: string
}

const props = defineProps<Props>()

// Wrap the HTML in a basic document structure with email-safe styles
const iframeContent = computed(() => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: #f9fafb;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100%;
    }
    #preview-content {
      background: white;
      padding: 20px;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      max-width: 100%;
    }
  </style>
</head>
<body>
  <div id="preview-content">
    ${props.html}
  </div>
</body>
</html>`
})
</script>

<style scoped>
.component-preview {
  margin: 2rem 0;
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 8px;
  overflow: hidden;
  background: white;
}

.preview-header {
  padding: 0.75rem 1rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.preview-title {
  display: block;
}

.preview-container {
  position: relative;
  background: #f9fafb;
}

.preview-iframe {
  width: 100%;
  min-height: 200px;
  border: none;
  display: block;
}
</style>
