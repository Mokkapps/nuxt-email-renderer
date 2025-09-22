<script lang="ts">
import { defineComponent, h } from 'vue'

export const EStyle = defineComponent({
  name: 'EStyle',
  setup(_, { slots }) {
    return () => {
      return h(
        'style',
        {
          'data-id': '__nuxt-email-style',
        },
        slots.default?.(),
      )
    }
  },
})

export default EStyle
</script>
