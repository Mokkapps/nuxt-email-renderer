import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from '../../server/utils/render'
import EFont from './EFont.vue'

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

  it('renders with webFont prop', async () => {
    const webFont = {
      url: 'example.com/font.woff',
      format: 'woff',
    } as const

    const component = h(EFont, {
      fallbackFontFamily: 'Helvetica',
      fontFamily: 'Arial',
      webFont,
    })
    const html = await render(component)

    expect(html).toMatchSnapshot()
  })

  it('renders with multiple fallback fonts', async () => {
    const component = h(EFont, {
      fallbackFontFamily: ['Helvetica', 'Verdana'],
      fontFamily: 'Arial',
    })
    const html = await render(component)

    expect(html).toContain('font-family: \'Arial\', Helvetica, Verdana;')
  })

  it('renders correctly', async () => {
    const component = h(EFont, {
      fallbackFontFamily: 'Verdana',
      fontFamily: 'Roboto',
    })

    const html = await render(component)
    expect(html).toMatchSnapshot()
  })
})
