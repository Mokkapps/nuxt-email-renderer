<script lang="ts">
import type { CSSProperties } from 'vue'
import { defineComponent, h } from 'vue'
import { extractPaddingFromStyle } from '../utils/extract-padding'

export default defineComponent({
  name: 'EContainer',
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
          role: 'presentation',
          cellspacing: '0',
          cellpadding: '0',
          border: '0',
          style: {
            'max-width': '37.5em',
            ...remainingStyle,
          },
          ...restAttrs,
        },
        [h('tbody', [h('tr', { style: 'width: 100%' }, [h('td', paddingStyle ? { style: paddingStyle } : {}, slots.default?.())])])],
      )
    }
  },
})
</script>
