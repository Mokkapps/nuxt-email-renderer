import { describe, it, expect } from 'vitest'
import { render } from '../../server/utils/render'
import EButton from './EButton.vue'
import { h } from 'vue'

describe('EButton Component', () => {
  it('renders children correctly', async () => {
    const testMessage = 'Test message'
    const component = {
      render() {
        return h(EButton, {}, {
          default: () => testMessage,
        })
      },
    }
    const html = await render(component)
    expect(html).toContain(testMessage)
  })

  it('renders as an anchor element with correct structure', async () => {
    const component = {
      render() {
        return h(EButton, {}, {
          default: () => 'Click me',
        })
      },
    }
    const html = await render(component)

    expect(html).toContain('<a')
    expect(html).toContain('Click me')
    expect(html).toContain('</a>')
    // Should contain three spans for MSO compatibility
    expect(html.match(/<span/g)).toHaveLength(3)
  })

  it('applies href attribute correctly', async () => {
    const testUrl = 'https://example.com'
    const component = {
      render() {
        return h(EButton, { href: testUrl }, {
          default: () => 'Link button',
        })
      },
    }
    const html = await render(component)

    expect(html).toContain(`href="${testUrl}"`)
  })

  it('applies target attribute correctly', async () => {
    const component = {
      render() {
        return h(EButton, {
          href: 'https://example.com',
          target: '_blank',
        }, {
          default: () => 'External link',
        })
      },
    }
    const html = await render(component)

    expect(html).toContain('target="_blank"')
  })

  it('applies default styles correctly', async () => {
    const component = {
      render() {
        return h(EButton, {}, {
          default: () => 'Styled button',
        })
      },
    }
    const html = await render(component)

    expect(html).toContain('line-height:100%')
    expect(html).toContain('text-decoration:none')
    expect(html).toContain('display:inline-block')
    expect(html).toContain('max-width:100%')
  })

  it('handles custom style object correctly', async () => {
    const customStyle = {
      backgroundColor: '#007bff',
      color: 'white',
      borderRadius: '4px',
    }

    const component = {
      render() {
        return h(EButton, { style: customStyle }, {
          default: () => 'Custom styled button',
        })
      },
    }
    const html = await render(component)

    expect(html).toContain('background-color:#007bff')
    expect(html).toContain('color:white')
    expect(html).toContain('border-radius:4px')
  })

  it('handles padding shorthand correctly', async () => {
    const component = {
      render() {
        return h(EButton, { style: { padding: '10px 20px' } }, {
          default: () => 'Padded button',
        })
      },
    }
    const html = await render(component)

    // Should convert to individual padding values: 10px top/bottom, 20px left/right
    expect(html).toContain('padding:10px 20px 10px 20px')
  })

  it('handles individual padding properties correctly', async () => {
    const component = {
      render() {
        return h(EButton, {
          style: {
            paddingTop: '15px',
            paddingRight: '25px',
            paddingBottom: '10px',
            paddingLeft: '5px',
          },
        }, {
          default: () => 'Individual padding button',
        })
      },
    }
    const html = await render(component)

    expect(html).toContain('padding:15px 25px 10px 5px')
  })

  it('handles different padding units (em, rem, %)', async () => {
    const component = {
      render() {
        return h(EButton, { style: { padding: '1em' } }, {
          default: () => 'Em padding button',
        })
      },
    }
    const html = await render(component)

    // 1em should convert to 16px
    expect(html).toContain('padding:16px 16px 16px 16px')
  })

  it('generates MSO conditional comments for Outlook compatibility', async () => {
    const component = {
      render() {
        return h(EButton, { style: { padding: '10px 15px' } }, {
          default: () => 'MSO compatible button',
        })
      },
    }
    const html = await render(component)

    // Should contain MSO conditional comments
    expect(html).toContain('<!--[if mso]>')
    expect(html).toContain('<![endif]-->')
    expect(html).toContain('mso-font-width:-100%')
    expect(html).toContain('mso-text-raise')
  })

  it('calculates MSO text-raise correctly based on vertical padding', async () => {
    const component = {
      render() {
        return h(EButton, { style: { padding: '12px 8px' } }, {
          default: () => 'Text raise button',
        })
      },
    }
    const html = await render(component)

    // Vertical padding is 12px top + 12px bottom = 24px
    // 24px converted to pt (24 * 3/4 = 18pt)
    expect(html).toContain('mso-text-raise:18')
  })

  it('handles complex nested content', async () => {
    const component = {
      render() {
        return h(EButton, { href: 'https://example.com' }, {
          default: () => [
            h('strong', 'Bold '),
            'and normal text',
            h('br'),
            h('span', { style: { fontSize: '12px' } }, 'Small text'),
          ],
        })
      },
    }
    const html = await render(component)

    expect(html).toContain('<strong>Bold </strong>')
    expect(html).toContain('and normal text')
    expect(html).toContain('<br>')
    expect(html).toContain('<span style="font-size:12px">Small text</span>')
  })

  it('handles numeric padding values', async () => {
    const component = {
      render() {
        return h(EButton, { style: { padding: 20 } }, {
          default: () => 'Numeric padding',
        })
      },
    }
    const html = await render(component)

    expect(html).toContain('padding:20px 20px 20px 20px')
  })

  it('handles string style attribute gracefully', async () => {
    const component = {
      render() {
        return h(EButton, { style: 'background-color: red; color: white;' }, {
          default: () => 'String style button',
        })
      },
    }
    const html = await render(component)

    // Should still render without errors, though individual style parsing won't work
    expect(html).toContain('String style button')
    expect(html).toContain('<a')
  })

  it('handles empty/no content gracefully', async () => {
    const component = {
      render() {
        return h(EButton, { href: 'https://example.com' })
      },
    }
    const html = await render(component)

    expect(html).toContain('<a')
    expect(html).toContain('href="https://example.com"')
    expect(html).toContain('</a>')
  })

  it('preserves other CSS properties when applying padding', async () => {
    const component = {
      render() {
        return h(EButton, {
          style: {
            padding: '10px',
            backgroundColor: '#ff6b6b',
            fontSize: '16px',
            fontWeight: 'bold',
            border: '2px solid #ff5252',
          },
        }, {
          default: () => 'Fully styled button',
        })
      },
    }
    const html = await render(component)

    expect(html).toContain('background-color:#ff6b6b')
    expect(html).toContain('font-size:16px')
    expect(html).toContain('font-weight:bold')
    expect(html).toContain('border:2px solid #ff5252')
    expect(html).toContain('padding:10px 10px 10px 10px')
  })

  it('applies inner span styles for MSO text raise', async () => {
    const component = {
      render() {
        return h(EButton, { style: { padding: '8px 12px 6px 10px' } }, {
          default: () => 'Inner span test',
        })
      },
    }
    const html = await render(component)

    // Should contain inner span with text styles
    expect(html).toContain('line-height:120%')
    expect(html).toContain('mso-padding-alt:0px')
    // Bottom padding is 6px, so mso-text-raise should be 6 * 3/4 = 4.5pt
    expect(html).toContain('mso-text-raise:4.5')
  })
})
