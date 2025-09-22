import { describe, it, expect } from 'vitest'
import { render } from '../../server/utils/render'
import EHtml from './EHtml.vue'
import { h } from 'vue'

describe('<EHtml> component', () => {
  it('renders children correctly', async () => {
    const testMessage = 'Test message'
    const component = h(EHtml, [
      testMessage,
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  })
})
