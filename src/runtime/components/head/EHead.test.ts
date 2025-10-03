import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from '../../server/utils/render'
import EHead from './EHead.vue'

describe('<EHead> component', () => {
  it('renders children correctly', async () => {
    const testMessage = 'Test message'
    const component = h(EHead, [
      testMessage,
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  })

  it('renders correctly', async () => {
    const component = {
      render() {
        return h(EHead, {}, {
          default: () => 'Lorem ipsum',
        })
      },
    }
    const html = await render(component)
    expect(html).toMatchSnapshot()
  })

  it('renders style tags', async () => {
    const component = {
      render() {
        return h(EHead, { style: `body{
            color: red;
          }` })
      },
    }
    const html = await render(component)
    expect(html).toMatchSnapshot()
  })
})
