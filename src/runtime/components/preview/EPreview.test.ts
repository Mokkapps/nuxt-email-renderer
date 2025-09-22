import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from '../../server/utils/render'
import { EPreview } from './EPreview.vue'

describe('<EPreview> component', () => {
  it('renders children correctly', async () => {
    const testMessage = 'Test message'
    const component = h(EPreview, [
      testMessage,
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  })
})
