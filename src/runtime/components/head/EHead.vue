<script lang="ts">
import { defineComponent, h } from 'vue'

export const EHead = defineComponent({
  name: 'EHead',
  setup(_, { slots }) {
    return () => {
      return h('head', [
        h('meta', { httpEquiv: 'Content-Type', content: 'text/html; charset=UTF-8' }),
        h('meta', { name: 'x-apple-disable-message-reformatting' }),
        slots.default?.(),
      ])
    }
  },
})

export default EHead
</script>
