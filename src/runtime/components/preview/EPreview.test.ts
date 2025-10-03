import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from '../../server/utils/render'
import EPreview, { renderWhiteSpace } from './EPreview.vue'

describe('<EPreview> component', () => {
  it('renders children correctly', async () => {
    const testMessage = 'Test message'
    const component = h(EPreview, [
      testMessage,
    ])
    const html = await render(component)
    expect(html).toContain(testMessage)
  })

  it('renders correctly with array text', async () => {
    const component = h(EPreview, [
      'Email preview',
    ])
    const html = await render(component)

    expect(html).toMatchSnapshot()
  })

  it('renders correctly with really long text', async () => {
    const longText = 'really long'.repeat(100)

    const component = h(EPreview, [
      longText,
    ])
    const html = await render(component)
    expect(html).toMatchSnapshot()
  })

  describe('renderWhiteSpace', () => {
    it('renders null when text length is greater than or equal to PREVIEW_MAX_LENGTH (150)', () => {
      const text
        = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur dolore mollitia dignissimos itaque. At excepturi reiciendis iure molestias incidunt. Ab saepe, nostrum dicta dolor maiores tenetur eveniet odio amet ipsum?'
      const html = renderWhiteSpace(text)
      expect(html).toBeNull()
    })

    it('renders white space characters when text length is less than PREVIEW_MAX_LENGTH', () => {
      const text = 'Short text'
      const whiteSpaceCharacters = '\xA0\u200C\u200B\u200D\u200E\u200F\uFEFF'

      const html = renderWhiteSpace(text)
      expect(html).not.toBeNull()

      const actualTextContent = html?.children.join('')
      const expectedTextContent = whiteSpaceCharacters.repeat(150 - text.length)
      expect(actualTextContent).toBe(expectedTextContent)
    })
  })
})
