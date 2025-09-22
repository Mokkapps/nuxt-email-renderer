import { describe, it, expect } from 'vitest'
import { render } from '../../server/utils/render'
import EBody from './EBody.vue'
import { h } from 'vue'

describe('EBody Component', () => {
  it('should render a basic body element', async () => {
    const result = await render(EBody)

    expect(result).toContain('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"')
    expect(result).toContain('<body>')
    expect(result).toContain('</body>')
  })

  it('should render with slot content', async () => {
    const ComponentWithSlot = {
      render() {
        return h(EBody, {}, {
          default: () => h('div', { class: 'email-content' }, 'Hello World!'),
        })
      },
    }

    const result = await render(ComponentWithSlot)

    expect(result).toContain('<body>')
    expect(result).toContain('<div class="email-content">Hello World!</div>')
    expect(result).toContain('</body>')
  })

  it('should render with multiple slot children', async () => {
    const ComponentWithMultipleChildren = {
      render() {
        return h(EBody, {}, {
          default: () => [
            h('h1', 'Email Title'),
            h('p', 'Email paragraph'),
            h('div', { class: 'footer' }, 'Email footer'),
          ],
        })
      },
    }

    const result = await render(ComponentWithMultipleChildren)

    expect(result).toContain('<body>')
    expect(result).toContain('<h1>Email Title</h1>')
    expect(result).toContain('<p>Email paragraph</p>')
    expect(result).toContain('<div class="footer">Email footer</div>')
    expect(result).toContain('</body>')
  })

  it('should render with pretty formatting when option is enabled', async () => {
    const ComponentWithContent = {
      render() {
        return h(EBody, {}, {
          default: () => h('div', 'Content'),
        })
      },
    }

    const result = await render(ComponentWithContent, undefined, { pretty: true })

    expect(result).toContain('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"')
    expect(result).toContain('<body>')
    expect(result).toContain('<div>Content</div>')
    expect(result).toContain('</body>')
    // Pretty formatting should add proper indentation and line breaks
    expect(result.split('\n').length).toBeGreaterThan(1)
  })

  it('should render as plain text when plainText option is enabled', async () => {
    const ComponentWithContent = {
      render() {
        return h(EBody, {}, {
          default: () => [
            h('h1', 'Email Title'),
            h('p', 'This is a paragraph with some text.'),
          ],
        })
      },
    }

    const result = await render(ComponentWithContent, undefined, { plainText: true })

    // Should not contain HTML tags when rendered as plain text
    expect(result).not.toContain('<body>')
    expect(result).not.toContain('<h1>')
    expect(result).not.toContain('<p>')
    expect(result).toContain('EMAIL TITLE') // Plain text converter makes h1 uppercase
    expect(result).toContain('This is a paragraph with some text.')
  })

  it('should render empty body when no slots are provided', async () => {
    const result = await render(EBody)

    expect(result).toContain('<body></body>')
  })
})
