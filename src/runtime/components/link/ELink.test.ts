import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from '../../server/utils/render'
import ELink from './ELink.vue'

describe('<ELink> component', () => {
  it('renders children correctly', async () => {
    const testMessage = 'Test message'
    const component = h(ELink, [
      testMessage,
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  })

  it('passes style and other props correctly', async () => {
    const style = { color: 'red' }

    const component = h(ELink, { 'data-testid': 'link-test', style, 'href': 'https://example.com' }, 'TEST')
    const html = await render(component)
    expect(html).toContain('color:red')
    expect(html).toContain('data-testid="link-test"')
  })

  it('opens in a new tab', async () => {
    const component = h(ELink, { href: 'https://example.com' }, 'Test')
    const html = await render(component)

    expect(html).toContain(`target="_blank"`)
  })

  it('renders correctly', async () => {
    const component = h(ELink, { href: 'https://example.com' }, 'Example')
    const html = await render(component)

    expect(html).toMatchSnapshot()
  })
})
