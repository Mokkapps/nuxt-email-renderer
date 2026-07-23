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

  it('applies padding to an outer td wrapper, not the table', async () => {
    const component = {
      render() {
        return h(ERow, { style: { padding: '20px' } }, {
          default: () => 'Content',
        })
      },
    }
    const html = await render(component)
    expect(html).toContain('<td style="padding:20px;">')
    expect(html).not.toContain('<table style="padding:20px;">')
  })

  it('applies non-padding styles to the table', async () => {
    const component = {
      render() {
        return h(ERow, { style: { backgroundColor: 'yellow' } }, {
          default: () => 'Content',
        })
      },
    }
    const html = await render(component)
    expect(html).toContain('style="background-color:yellow;"')
    expect(html).not.toContain('<td style="background-color:yellow;">')
  })

  it('splits padding and non-padding styles correctly', async () => {
    const component = {
      render() {
        return h(ERow, { style: { padding: '15px', backgroundColor: 'red' } }, {
          default: () => 'Content',
        })
      },
    }
    const html = await render(component)
    expect(html).toContain('<td style="padding:15px;">')
    expect(html).toContain('style="background-color:red;"')
  })
})
