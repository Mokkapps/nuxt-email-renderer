import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from '../../server/utils/render'
import ESubject from './ESubject.vue'
import EHtml from '../html/EHtml.vue'
import EBody from '../body/EBody.vue'
import EText from '../text/EText.vue'

describe('<ESubject> component', () => {
  it('captures subject and returns it with html', async () => {
    const testSubject = 'Welcome to our platform!'
    const component = h(EHtml, {}, [
      h(ESubject, {}, testSubject),
      h(EBody, {}, [
        h(EText, {}, 'Email content'),
      ]),
    ])
    const result = await render(component)

    expect(result.subject).toBe(testSubject)
    expect(result.html).toContain('Email content')
    expect(result).toMatchSnapshot()
  })

  it('does not render subject in the HTML output', async () => {
    const testSubject = 'Secret Subject'
    const component = h(EHtml, {}, [
      h(ESubject, {}, testSubject),
      h(EBody, {}, [
        h(EText, {}, 'Email content'),
      ]),
    ])
    const result = await render(component)

    expect(result.html).not.toContain('Secret Subject')
  })

  it('decodes HTML entities in subject', async () => {
    const component = h(EHtml, {}, [
      h(ESubject, {}, 'Welcome to Procter &amp; Gamble!'),
      h(EBody, {}, [
        h(EText, {}, 'Email content'),
      ]),
    ])
    const result = await render(component)

    expect(result.subject).toBe('Welcome to Procter & Gamble!')
  })

  it('works with dynamic content', async () => {
    const siteName = 'MySite'
    const component = h(EHtml, {}, [
      h(ESubject, {}, `Welcome to ${siteName}!`),
      h(EBody, {}, [
        h(EText, {}, 'Email content'),
      ]),
    ])
    const result = await render(component)

    expect(result.subject).toBe('Welcome to MySite!')
  })

  it('returns only html when no subject is provided', async () => {
    const component = h(EHtml, {}, [
      h(EBody, {}, [
        h(EText, {}, 'Email content'),
      ]),
    ])
    const result = await render(component)

    expect(result).not.toHaveProperty('subject')
    expect(result.html).toContain('Email content')
  })
})
