<script lang="ts">
import { defineComponent, h } from 'vue'

export default defineComponent({
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
</script>
