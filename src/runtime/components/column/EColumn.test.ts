import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from '../../server/utils/render'
import EColumn from './EColumn.vue'

describe('<EColumn> component', () => {
  it('renders children correctly', async () => {
    const testMessage = 'Test message'
    const component = h(EColumn, [
      testMessage,
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  })

  it('passes style and other props correctly', async () => {
    const style = { backgroundColor: 'red' }

    const component = {
      render() {
        return h(EColumn, { 'data-testid': 'column-test', style }, {
          default: () => 'TEST',
        })
      },
    }
    const html = await render(component)

    expect(html).toContain('style="background-color:red;"')
    expect(html).toContain('data-testid="column-test"')
  })

  it('renders correctly', async () => {
    const component = {
      render() {
        return h(EColumn, {}, {
          default: () => 'Lorem ipsum',
        })
      },
    }
    const html = await render(component)
    expect(html).toMatchSnapshot()
  })
})
