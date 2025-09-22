import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from '../../server/utils/render'
import { ESection } from './ESection.vue'

describe('<ESection> component', () => {
  it('renders children correctly', async () => {
    const testMessage = 'Test message'
    const component = h(ESection, [
      testMessage,
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  })
})
