<script lang="ts">
import type { CSSProperties } from 'vue'
import { defineComponent, h } from 'vue'

export interface EBodyProps {
  style?: CSSProperties
  [key: string]: unknown
}

export default defineComponent({
  name: 'EBody',
  props: {
    style: {
      type: Object as () => CSSProperties,
      default: () => ({}),
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      const { style = {} } = props

      // Extract background styles for the body element
      const bodyStyle: CSSProperties = {
        background: style.background,
        backgroundColor: style.backgroundColor,
      }

      // Create the table structure for email client compatibility
      const tableNode = h('table', {
        border: 0,
        width: '100%',
        cellpadding: '0',
        cellspacing: '0',
        role: 'presentation',
        align: 'center',
      }, [
        h('tbody', [
          h('tr', [
            // Yahoo and AOL remove all styles of the body element while converting it to a div,
            // so we need to apply them to an inner cell.
            // See https://github.com/resend/react-email/issues/662.
            h('td', { style }, slots.default?.()),
          ]),
        ]),
      ])

      return h('body', {
        ...attrs,
        style: bodyStyle,
      }, [tableNode])
    }
  },
})
</script>
