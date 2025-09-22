import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from '../../server/utils/render'
import { ECodeInline } from './ECodeInline.vue'

describe('<ECodeInline> component', () => {
  it('renders children correctly', async () => {
    const testMessage = 'Test message'
    const component = h(ECodeInline, [
      testMessage,
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  })
})
