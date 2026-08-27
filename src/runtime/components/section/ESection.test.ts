import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from '../../server/utils/render'
import ESection from './ESection.vue'

describe('<ESection> component', () => {
  it('renders children correctly', async () => {
    const testMessage = 'Test message'
    const component = h(ESection, [
      testMessage,
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  })

  it('applies padding to the inner td, not the table', async () => {
    const component = {
      render() {
        return h(ESection, { style: { padding: '20px' } }, {
          default: () => 'Content',
        })
      },
    }
    const html = await render(component)
    expect(html).toContain('<td style="padding:20px;">')
    expect(html).not.toContain('<table style="padding:20px;">')
    expect(html).not.toContain('<table style="padding:20px;')
  })

  it('applies non-padding styles to the table, not the td', async () => {
    const component = {
      render() {
        return h(ESection, { style: { backgroundColor: 'green' } }, {
          default: () => 'Content',
        })
      },
    }
    const html = await render(component)
    expect(html).toContain('style="background-color:green;"')
    expect(html).not.toContain('<td style="background-color:green;">')
  })

  it('splits padding and non-padding styles correctly', async () => {
    const component = {
      render() {
        return h(ESection, { style: { padding: '10px', backgroundColor: 'blue' } }, {
          default: () => 'Content',
        })
      },
    }
    const html = await render(component)
    expect(html).toContain('<td style="padding:10px;">')
    expect(html).toContain('style="background-color:blue;"')
  })
})
