<script lang="ts">
import type { CSSProperties } from 'vue'
import { defineComponent, h } from 'vue'
import { extractPaddingFromStyle } from '../utils/extract-padding'

export default defineComponent({
  name: 'ERow',
  inheritAttrs: false,
  setup(_, { slots, attrs }) {
    return () => {
      const { paddingStyle, remainingStyle } = extractPaddingFromStyle(attrs.style as CSSProperties | undefined)
      const { style: _style, ...restAttrs } = attrs as Record<string, unknown>

      const outerTableProps = {
        align: 'center',
        width: '100%',
        border: '0',
        cellPadding: '0',
        cellSpacing: '0',
        role: 'presentation',
        ...(remainingStyle ? { style: remainingStyle } : {}),
        ...restAttrs,
      }

      const columnContent = [h('tbody', {
        style: {
          width: '100%',
        },
      }, [h('tr', {
        style: {
          width: '100%',
        },
      }, slots.default?.())])]

      if (!paddingStyle) {
        return h('table', outerTableProps, columnContent)
      }

      return h(
        'table',
        outerTableProps,
        [h('tbody', [h('tr', [h('td', { style: paddingStyle }, [
          h('table', {
            align: 'center',
            width: '100%',
            border: '0',
            cellPadding: '0',
            cellSpacing: '0',
            role: 'presentation',
          }, columnContent),
        ])])])],
      )
    }
  },
})
</script>
