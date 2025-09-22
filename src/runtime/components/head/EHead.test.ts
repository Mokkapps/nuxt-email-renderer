import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from '../../server/utils/render'
import { EHead } from './EHead.vue'

describe('<EHead> component', () => {
  it('renders children correctly', async () => {
    const testMessage = 'Test message'
    const component = h(EHead, [
      testMessage,
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  })
})
