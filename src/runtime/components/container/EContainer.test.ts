import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from '../../server/utils/render'
import { EContainer } from './EContainer.vue'

describe('<EContainer> component', () => {
  it('renders children correctly', async () => {
    const testMessage = 'Test message'
    const component = h(EContainer, [
      testMessage,
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  })
})
