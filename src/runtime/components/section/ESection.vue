<script lang="ts">
import type { CSSProperties } from 'vue'
import { defineComponent, h } from 'vue'
import { extractPaddingFromStyle } from '../utils/extract-padding'

export default defineComponent({
  name: 'ESection',
  inheritAttrs: false,
  setup(_, { slots, attrs }) {
    return () => {
      const { paddingStyle, remainingStyle } = extractPaddingFromStyle(attrs.style as CSSProperties | undefined)
      const { style: _style, ...restAttrs } = attrs as Record<string, unknown>
      return h(
        'table',
        {
          align: 'center',
          width: '100%',
          border: '0',
          cellPadding: '0',
          cellSpacing: '0',
          role: 'presentation',
          ...(remainingStyle ? { style: remainingStyle } : {}),
          ...restAttrs,
        },
        [h('tbody', [h('tr', [h('td', paddingStyle ? { style: paddingStyle } : {}, slots.default?.())])])],
      )
    }
  },
})
</script>
