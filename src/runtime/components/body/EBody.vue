<script lang="ts">
import type { VNode } from 'vue'
import { defineComponent, h } from 'vue'

export const EBody = defineComponent({
  name: 'EBody',
  setup(_, { slots }) {
    return () => {
      const bodyNode: VNode = h('body', slots.default?.())

      return bodyNode
    }
  },
})

export default EBody
</script>
