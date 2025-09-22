import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from '../../server/utils/render'
import { EStyle } from './EStyle.vue'

describe('<EStyle> component', () => {
  it('renders children correctly', async () => {
    const component = h(EStyle, `.pager.inactive {display: none;}`)
    const html = await render(component)
    expect(html).toMatchInlineSnapshot('"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><style data-id="__nuxt-email-style">.pager.inactive {display: none;}</style>"')
  })
})
