import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from '../../server/utils/render'
import EHeading from './EHeading.vue'

describe('<EHeading> component', () => {
  it('renders children correctly', async () => {
    const testMessage = 'Test message'
    const component = {
      render() {
        return h(EHeading, {}, {
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
        return h(EHeading, { 'data-testid': 'heading-test', style }, {
          default: () => 'TEST',
        })
      },
    }
    const html = await render(component)

    expect(html).toContain('background-color:red')
    expect(html).toContain('data-testid="heading-test"')
  })

  it('renders the <EHeading> component', async () => {
    const component = {
      render() {
        return h(EHeading, { as: 'h2', mx: 4 }, {
          default: () => 'Lorem ipsum',
        })
      },
    }
    const html = await render(component)

    expect(html).toMatchSnapshot()
  })
})
