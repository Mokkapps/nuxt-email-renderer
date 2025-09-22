import { describe, it, expect } from 'vitest'
import { render } from '../../server/utils/render'
import EHtml from './EHtml.vue'
import { h } from 'vue'

describe('<EHtml> component', () => {
  it('renders children correctly', async () => {
    const testMessage = 'Test message'
    const component = h(EHtml, [
      testMessage,
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  })

  it('passes props correctly', async () => {
    const component = {
      render() {
        return h(EHtml, { 'lang': 'fr', 'dir': 'rtl', 'data-testid': 'html-test' })
      },
    }
    const html = await render(component)

    expect(html).toContain('lang="fr"')
    expect(html).toContain('dir="rtl"')
    expect(html).toContain('data-testid="html-test"')
  })

  it('renders correctly', async () => {
    const component = {
      render() {
        return h(EHtml, {}, {
          default: () => 'Lorem ipsum',
        })
      },
    }
    const html = await render(component)
    expect(html).toMatchSnapshot()
  })
})
