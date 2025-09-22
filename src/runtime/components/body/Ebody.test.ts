import { describe, it, expect } from 'vitest'
import { render } from '../../server/utils/render'
import EBody from './EBody.vue'
import { h } from 'vue'

describe('EBody Component', () => {
  it('should render a basic body element', async () => {
    const testMessage = 'Test message'
    const component = {
      render() {
        return h(EBody, { }, {
          default: () => testMessage,
        })
      },
    }
    const html = await render(component)
    expect(html).toContain(testMessage)
  })

  it('passes style and other props correctly', async () => {
    const style = { backgroundColor: 'red' }

    const component = {
      render() {
        return h(EBody, { 'data-testid': 'body-test', style }, {
          default: () => 'TEST',
        })
      },
    }
    const html = await render(component)
    expect(html).toContain('data-testid="body-test"')
    expect(html).toContain('style="background-color:red;"')
  })

  it('renders correctly', async () => {
    const component = {
      render() {
        return h(EBody, {}, {
          default: () => 'Lorem ipsum',
        })
      },
    }
    const html = await render(component)
    expect(html).toMatchSnapshot()
  })
})
