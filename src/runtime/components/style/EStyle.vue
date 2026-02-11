<script lang="ts">
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'EStyle',
  setup(_, { slots }) {
    return () => {
      // Get the raw CSS content from the slot
      const slotContent = slots.default?.()
      const cssContent = slotContent?.[0]?.children

      // Use innerHTML to prevent HTML entity escaping for CSS content
      return h('style', {
        'data-id': '__nuxt-email-style',
        innerHTML: typeof cssContent === 'string' ? cssContent : slotContent,
      })
    }
  },
})
</script>
