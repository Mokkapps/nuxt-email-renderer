import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from '../../server/utils/render'
import EText from './EText.vue'

describe('<EText> component', () => {
  it('renders children correctly', async () => {
    const testMessage = 'Test message'
    const component = h(EText, [
      testMessage,
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  })
})
