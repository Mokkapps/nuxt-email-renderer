import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from '../../server/utils/render'
import EContainer from './EContainer.vue'

describe('<EContainer> component', () => {
  it('renders children correctly', async () => {
    const testMessage = 'Test message'
    const component = h(EContainer, [
      testMessage,
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  })

  it('passes style and other props correctly', async () => {
    const style = { backgroundColor: 'red' }

    const component = {
      render() {
        return h(EContainer, { 'data-testid': 'container-test', style }, {
          default: () => 'TEST',
        })
      },
    }
    const html = await render(component)

    expect(html).toContain('style="max-width:37.5em;background-color:red;"')
    expect(html).toContain('data-testid="container-test"')
  })

  it('applies padding to the inner td, not the table', async () => {
    const component = {
      render() {
        return h(EContainer, { style: { padding: '20px' } }, {
          default: () => 'Content',
        })
      },
    }
    const html = await render(component)
    expect(html).toContain('<td style="padding:20px;">')
    expect(html).not.toContain('<table style="max-width:37.5em;padding:20px;">')
  })

  it('splits padding and non-padding styles correctly', async () => {
    const component = {
      render() {
        return h(EContainer, { style: { padding: '10px', backgroundColor: 'blue' } }, {
          default: () => 'Content',
        })
      },
    }
    const html = await render(component)
    expect(html).toContain('<td style="padding:10px;">')
    expect(html).toContain('style="max-width:37.5em;background-color:blue;"')
  })

  it('renders correctly', async () => {
    const component = {
      render() {
        return h(EContainer, {}, {
          default: () => 'Lorem ipsum',
        })
      },
    }
    const html = await render(component)
    expect(html).toMatchSnapshot()
  })
})
