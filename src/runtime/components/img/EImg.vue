<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, h, ref } from 'vue'

export const EImg = defineComponent({
  name: 'EImg',
  props: {
    src: {
      type: String,
      required: true,
    },
    width: {
      type: [String, Number] as PropType<string | number>,
      required: false,
    },
    height: {
      type: [String, Number] as PropType<string | number>,
      required: false,
    },
    alt: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const src = ref(props.src)

    return () => {
      return h('img', {
        style: 'display: block; outline: none; border: none; text-decoration: none',
        src: src.value,
        width: props.width,
        height: props.height,
        alt: props.alt,
      })
    }
  },
})

export default EImg
</script>
