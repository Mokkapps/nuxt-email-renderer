<script lang="ts">
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'EStyle',
  setup(_, { slots }) {
    return () => {
      // Get the raw CSS content from the slot
      const slotContent = slots.default?.()

      // Extract CSS text from the slot content
      let cssText = ''
      if (slotContent && slotContent.length > 0) {
        const firstNode = slotContent[0]
        if (typeof firstNode.children === 'string') {
          cssText = firstNode.children
        }
        else if (Array.isArray(firstNode.children)) {
          // If children is an array of text nodes, join them
          cssText = firstNode.children.join('')
        }
      }

      // Use innerHTML to prevent HTML entity escaping for CSS content
      return h('style', {
        'data-id': '__nuxt-email-style',
        'innerHTML': cssText,
      })
    }
  },
})
</script>
