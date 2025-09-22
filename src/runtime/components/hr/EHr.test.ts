import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from '../../server/utils/render'
import { EHr } from './EHr.vue'

describe('<EHr> component', () => {
  it('passes styles and other props correctly', async () => {
    const component = h(EHr, {
      'data-testid': 'hr-test',
      'style': {
        width: '50%',
        borderColor: 'black',
      },
    })
    const html = await render(component)
    expect(html).toContain('width:50%')
    expect(html).toContain('border-color:black')
    expect(html).toContain('data-testid="hr-test"')
  })

  it('renders correctly', async () => {
    const component = {
      render() {
        return h(EHr)
      },
    }
    const html = await render(component)
    expect(html).toMatchSnapshot()
  })
})
