import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from '../../server/utils/render'
import EStyle from './EStyle.vue'

describe('<EStyle> component', () => {
  it('renders children correctly', async () => {
    const component = h(EStyle, `.pager.inactive {display: none;}`)
    const html = await render(component)
    expect(html).toMatchInlineSnapshot('"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><style data-id="__nuxt-email-style">.pager.inactive {display: none;}</style>"')
  })

  it('renders CSS with child combinator (>) correctly', async () => {
    const component = h(EStyle, `.hackWebmailPadding > tbody > tr > td:first-child { padding: 20px; }`)
    const html = await render(component)
    expect(html).toContain('.hackWebmailPadding > tbody > tr > td:first-child { padding: 20px; }')
  })

  it('renders CSS with font-family quotes correctly', async () => {
    const component = h(EStyle, `body { font-family: "Arial", sans-serif; }`)
    const html = await render(component)
    expect(html).toContain('font-family: "Arial", sans-serif;')
  })

  it('renders CSS with less-than symbol (<) correctly', async () => {
    const component = h(EStyle, `@media (max-width: 600px) { body { font-size: 14px; } }`)
    const html = await render(component)
    expect(html).toContain('max-width: 600px')
  })
})
