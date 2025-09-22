import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from '../../server/utils/render'
import { EColumn } from './EColumn.vue'

describe('<EColumn> component', () => {
  it('renders children correctly', async () => {
    const testMessage = 'Test message'
    const component = h(EColumn, [
      testMessage,
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  })
})
