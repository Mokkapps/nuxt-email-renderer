import { describe, it, expect } from 'vitest'
import { render } from '../../server/utils/render'
import EButton from './EButton.vue'
import { h } from 'vue'

describe('EButton Component', () => {
  it('renders children correctly', async () => {
    const testMessage = 'Test message'
    const component = {
      render() {
        return h(EButton, {}, {
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
        return h(EButton, { 'data-testid': 'button-test', style }, {
          default: () => 'TEST',
        })
      },
    }
    const html = await render(component)

    expect(html).toContain('background-color:red')
    expect(html).toContain('data-testid="button-test"')
  })

  it('renders correctly with padding values from style prop', async () => {
    const style = { padding: '12px 20px' }

    const component = {
      render() {
        return h(EButton, { href: 'https://example.com', style }, {
          default: () => 'TEST',
        })
      },
    }
    const html = await render(component)
    expect(html).toMatchSnapshot()
  })

  it('renders the <EButton> component with no padding value', async () => {
    const component = {
      render() {
        return h(EButton, { href: 'https://example.com' })
      },
    }
    const html = await render(component)

    expect(html).toMatchSnapshot()
  })

  it('should allow users to overwrite style props', async () => {
    const component = {
      render() {
        return h(EButton, { style: {
          lineHeight: '150%',
          display: 'block',
          textDecoration: 'underline red',
          maxWidth: '50%',
        } })
      },
    }
    const html = await render(component)

    expect(html).toMatchSnapshot()
  })
})
