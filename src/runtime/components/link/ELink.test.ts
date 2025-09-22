import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from '../../server/utils/render'
import { ELink } from './ELink.vue'

describe('<ELink> component', () => {
  it('renders children correctly', async () => {
    const testMessage = 'Test message'
    const component = h(ELink, [
      testMessage,
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  })
})
