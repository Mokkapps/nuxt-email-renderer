<script lang="ts">
import { computed, defineComponent, h, inject } from 'vue'

export const SUBJECT_INJECTION_KEY = Symbol('email-subject')

export default defineComponent({
  name: 'ESubject',
  setup(_, { slots }) {
    const setSubject = inject<((subject: string) => void) | undefined>(
      SUBJECT_INJECTION_KEY,
      undefined,
    )

    const text = computed(() => {
      if (slots.default !== undefined) {
        const children = slots.default()[0]?.children as string
        return Array.isArray(children) ? children.join('') : children || ''
      }
      return ''
    })

    if (setSubject) {
      setSubject(text.value)
    }

    // Render nothing - this component is only for capturing the subject
    return () => null
  },
})
</script>
