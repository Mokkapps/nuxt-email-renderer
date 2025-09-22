import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from '../../server/utils/render'
import { EFont } from './EFont.vue'

describe('<EFont> component', () => {
  it('renders with default props', async () => {
    const component = h(EFont, {
      fallbackFontFamily: 'Helvetica',
      fontFamily: 'Arial',
    })

    const html = await render(component)

    expect(html).toContain('font-style: normal;')
    expect(html).toContain('font-weight: 400;')
    expect(html).toContain('font-family: \'Arial\';')
  })
})
