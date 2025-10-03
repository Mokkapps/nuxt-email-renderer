<script lang="ts">
import { type CSSProperties, defineComponent, h, type PropType } from 'vue'
import { parseMarkdownToJSX } from './utils'
import type { StylesType } from './utils'

export default defineComponent({
  name: 'EMarkdown',
  props: {
    source: {
      type: String,
      default: undefined,
    },
    markdownCustomStyles: {
      type: Object as PropType<StylesType>,
      default: undefined,
    },
    markdownContainerStyles: {
      type: Object as PropType<CSSProperties>,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    const defaultSlot = slots.default
    const defaultSlotText = defaultSlot?.()[0]?.children as string | undefined

    const parsedMarkdown = parseMarkdownToJSX({
      markdown: defaultSlotText || props.source || '',
      customStyles: props.markdownCustomStyles,
    })

    return () => {
      return h('div', {
        style: props.markdownContainerStyles,
        innerHTML: parsedMarkdown,
      })
    }
  },
})
</script>
