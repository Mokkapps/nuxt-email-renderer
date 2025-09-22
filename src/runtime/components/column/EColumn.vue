<script lang="ts">
import { defineComponent, h } from 'vue'

export const EColumn = defineComponent({
  name: 'EColumn',
  setup(_, { slots }) {
    return () => {
      return h(
        'td',
        {
          role: 'presentation',
        },
        slots.default?.(),
      )
    }
  },
})

export default EColumn
</script>
