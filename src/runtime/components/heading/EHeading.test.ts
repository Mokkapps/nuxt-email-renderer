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

  describe('as prop', () => {
    it('renders as h1 by default', async () => {
      const component = {
        render() {
          return h(EHeading, {}, {
            default: () => 'Default heading',
          })
        },
      }
      const html = await render(component)
      expect(html).toContain('<h1')
      expect(html).toContain('Default heading')
      expect(html).toContain('</h1>')
    })

    it('renders as h2 when as="h2"', async () => {
      const component = {
        render() {
          return h(EHeading, { as: 'h2' }, {
            default: () => 'Level 2 heading',
          })
        },
      }
      const html = await render(component)
      expect(html).toContain('<h2')
      expect(html).toContain('Level 2 heading')
      expect(html).toContain('</h2>')
    })

    it('renders as h3 when as="h3"', async () => {
      const component = {
        render() {
          return h(EHeading, { as: 'h3' }, {
            default: () => 'Level 3 heading',
          })
        },
      }
      const html = await render(component)
      expect(html).toContain('<h3')
      expect(html).toContain('</h3>')
    })

    it('renders as h4 when as="h4"', async () => {
      const component = {
        render() {
          return h(EHeading, { as: 'h4' }, {
            default: () => 'Level 4 heading',
          })
        },
      }
      const html = await render(component)
      expect(html).toContain('<h4')
      expect(html).toContain('</h4>')
    })

    it('renders as h5 when as="h5"', async () => {
      const component = {
        render() {
          return h(EHeading, { as: 'h5' }, {
            default: () => 'Level 5 heading',
          })
        },
      }
      const html = await render(component)
      expect(html).toContain('<h5')
      expect(html).toContain('</h5>')
    })

    it('renders as h6 when as="h6"', async () => {
      const component = {
        render() {
          return h(EHeading, { as: 'h6' }, {
            default: () => 'Level 6 heading',
          })
        },
      }
      const html = await render(component)
      expect(html).toContain('<h6')
      expect(html).toContain('</h6>')
    })
  })

  describe('margin props', () => {
    it('applies margin all around with m prop (numeric)', async () => {
      const component = {
        render() {
          return h(EHeading, { m: 16 }, {
            default: () => 'Margin all around',
          })
        },
      }
      const html = await render(component)
      expect(html).toContain('margin:16px')
    })

    it('applies margin all around with m prop (string)', async () => {
      const component = {
        render() {
          return h(EHeading, { m: '20' }, {
            default: () => 'Margin all around string',
          })
        },
      }
      const html = await render(component)
      expect(html).toContain('margin:20px')
    })

    it('applies horizontal margin with mx prop', async () => {
      const component = {
        render() {
          return h(EHeading, { mx: 12 }, {
            default: () => 'Horizontal margin',
          })
        },
      }
      const html = await render(component)
      expect(html).toContain('margin-left:12px')
      expect(html).toContain('margin-right:12px')
    })

    it('applies vertical margin with my prop', async () => {
      const component = {
        render() {
          return h(EHeading, { my: 8 }, {
            default: () => 'Vertical margin',
          })
        },
      }
      const html = await render(component)
      expect(html).toContain('margin-top:8px')
      expect(html).toContain('margin-bottom:8px')
    })

    it('applies individual margin props', async () => {
      const component = {
        render() {
          return h(EHeading, {
            mt: 10,
            mr: 15,
            mb: 20,
            ml: 25,
          }, {
            default: () => 'Individual margins',
          })
        },
      }
      const html = await render(component)
      expect(html).toContain('margin-top:10px')
      expect(html).toContain('margin-right:15px')
      expect(html).toContain('margin-bottom:20px')
      expect(html).toContain('margin-left:25px')
    })

    it('gives priority to specific margins over general ones', async () => {
      const component = {
        render() {
          return h(EHeading, {
            m: 10,
            mt: 20, // Should override the top margin from m
          }, {
            default: () => 'Priority test',
          })
        },
      }
      const html = await render(component)
      expect(html).toContain('margin-top:20px') // Specific mt should win
      expect(html).toContain('margin:10px') // General m should still be there
    })

    it('combines mx/my with individual margins', async () => {
      const component = {
        render() {
          return h(EHeading, {
            mx: 10,
            mt: 5,
            mb: 15,
          }, {
            default: () => 'Combined margins',
          })
        },
      }
      const html = await render(component)
      expect(html).toContain('margin-left:10px')
      expect(html).toContain('margin-right:10px')
      expect(html).toContain('margin-top:5px')
      expect(html).toContain('margin-bottom:15px')
    })

    it('ignores invalid margin values', async () => {
      const component = {
        render() {
          return h(EHeading, {
            m: 'invalid',
            mt: 'not-a-number',
          }, {
            default: () => 'Invalid margins',
          })
        },
      }
      const html = await render(component)
      // Should not contain any margin styles for invalid values
      expect(html).not.toContain('margin:invalid')
      expect(html).not.toContain('margin-top:not-a-number')
    })
  })

  describe('style prop', () => {
    it('applies custom style object', async () => {
      const customStyle = {
        color: '#ff6b6b',
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center' as const,
      }

      const component = {
        render() {
          return h(EHeading, { style: customStyle }, {
            default: () => 'Styled heading',
          })
        },
      }
      const html = await render(component)
      expect(html).toContain('color:#ff6b6b')
      expect(html).toContain('font-size:24px')
      expect(html).toContain('font-weight:bold')
      expect(html).toContain('text-align:center')
    })

    it('combines style prop with margin props', async () => {
      const component = {
        render() {
          return h(EHeading, {
            style: { color: 'blue', fontSize: '18px' },
            m: 10,
            mt: 20,
          }, {
            default: () => 'Combined styles',
          })
        },
      }
      const html = await render(component)
      expect(html).toContain('color:blue')
      expect(html).toContain('font-size:18px')
      expect(html).toContain('margin:10px')
      expect(html).toContain('margin-top:20px')
    })

    it('handles string style gracefully', async () => {
      const component = {
        render() {
          return h(EHeading, {
            style: 'color: red; font-size: 16px;',
          }, {
            default: () => 'String style',
          })
        },
      }
      const html = await render(component)
      expect(html).toContain('String style')
      expect(html).toContain('<h1')
    })

    it('handles array style gracefully', async () => {
      const component = {
        render() {
          return h(EHeading, {
            style: [{ color: 'green' }, { fontSize: '14px' }],
          }, {
            default: () => 'Array style',
          })
        },
      }
      const html = await render(component)
      expect(html).toContain('Array style')
      expect(html).toContain('<h1')
    })
  })

  describe('complex combinations', () => {
    it('works with all props together', async () => {
      const component = {
        render() {
          return h(EHeading, {
            as: 'h3',
            m: 5,
            mt: 15,
            mx: 20,
            style: {
              color: '#333',
              fontFamily: 'Arial, sans-serif',
              lineHeight: '1.5',
            },
          }, {
            default: () => 'Complex heading',
          })
        },
      }
      const html = await render(component)

      // Check heading level
      expect(html).toContain('<h3')
      expect(html).toContain('</h3>')

      // Check margins
      expect(html).toContain('margin:5px')
      expect(html).toContain('margin-top:15px')
      expect(html).toContain('margin-left:20px')
      expect(html).toContain('margin-right:20px')

      // Check custom styles
      expect(html).toContain('color:#333')
      expect(html).toContain('font-family:Arial, sans-serif')
      expect(html).toContain('line-height:1.5')

      // Check content
      expect(html).toContain('Complex heading')
    })

    it('handles nested content', async () => {
      const component = {
        render() {
          return h(EHeading, { as: 'h2', m: 10 }, {
            default: () => [
              h('span', { style: { fontWeight: 'normal' } }, 'Normal '),
              h('strong', 'Bold '),
              'and plain text',
            ],
          })
        },
      }
      const html = await render(component)

      expect(html).toContain('<h2')
      expect(html).toContain('<span style="font-weight:normal">Normal </span>')
      expect(html).toContain('<strong>Bold </strong>')
      expect(html).toContain('and plain text')
      expect(html).toContain('</h2>')
    })

    it('handles empty content', async () => {
      const component = {
        render() {
          return h(EHeading, { as: 'h4', m: 8 })
        },
      }
      const html = await render(component)

      expect(html).toContain('<h4')
      expect(html).toContain('margin:8px')
      expect(html).toContain('</h4>')
    })
  })

  describe('edge cases', () => {
    it('handles zero margin values', async () => {
      const component = {
        render() {
          return h(EHeading, {
            m: 0,
            mt: '0',
          }, {
            default: () => 'Zero margins',
          })
        },
      }
      const html = await render(component)
      expect(html).toContain('margin:0px')
      expect(html).toContain('margin-top:0px')
    })

    it('handles decimal margin values', async () => {
      const component = {
        render() {
          return h(EHeading, {
            m: 12.5,
            mt: '8.75',
          }, {
            default: () => 'Decimal margins',
          })
        },
      }
      const html = await render(component)
      expect(html).toContain('margin:12.5px')
      expect(html).toContain('margin-top:8.75px')
    })

    it('handles negative margin values', async () => {
      const component = {
        render() {
          return h(EHeading, {
            m: -5,
            mt: '-10',
          }, {
            default: () => 'Negative margins',
          })
        },
      }
      const html = await render(component)
      expect(html).toContain('margin:-5px')
      expect(html).toContain('margin-top:-10px')
    })
  })
})
