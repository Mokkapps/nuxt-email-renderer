<script lang="ts">
import { defineComponent, h } from 'vue'

export const EHr = defineComponent({
  name: 'EHr',
  setup(_, { slots }) {
    return () => {
      return h('hr', {
        style: 'width: 100%; border: none; border-top: 1px solid #eaeaea;',
      })
    }
  },
})

export default EHr
</script>
