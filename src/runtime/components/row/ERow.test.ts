import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from '../../server/utils/render'
import ERow from './ERow.vue'

describe('<ERow> component', () => {
  it('renders children correctly', async () => {
    const testMessage = 'Test message'
    const component = h(ERow, [
      testMessage,
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  })
})
