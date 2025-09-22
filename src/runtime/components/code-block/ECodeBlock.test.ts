import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from '../../server/utils/render'
import { ECodeBlock } from './ECodeBlock.vue'

const stringSnapshotSerializer = {
  serialize(val: any) {
    return val
  },
  test(val: any) {
    return (typeof val == 'string')
  },
}
expect.addSnapshotSerializer(stringSnapshotSerializer)

describe('<ECodeBlock> component', () => {
  it('renders the Code Block component', async () => {
    const component = h(ECodeBlock, {
      code: `import { codeToThemedTokens } from 'shiki'

      const tokens = await codeToThemedTokens('<div class="foo">bar</div>', {
        lang: 'html',
        theme: 'min-dark'
      })`,
      lang: 'typescript',
      theme: 'dracula',
    })

    const actualOutput = await render(component)

    expect(actualOutput).toMatchInlineSnapshot(
      `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`,
    )
  })

  it('renders the Code Block with line numbers', async () => {
    const component = h(ECodeBlock, {
      'code': `import { codeToThemedTokens } from 'shiki'

      const tokens = await codeToThemedTokens('<div class="foo">bar</div>', {
        lang: 'html',
        theme: 'min-dark'
      })`,
      'lang': 'typescript',
      'theme': 'dracula',
      'show-line-numbers': true,
    })

    const actualOutput = await render(component)

    expect(actualOutput).toMatchInlineSnapshot(
      `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`,
    )
  })

  it('renders the Code Block with highlighted lines', async () => {
    const component = h(ECodeBlock, {
      'code': `import { codeToThemedTokens } from 'shiki'

      const tokens = await codeToThemedTokens('<div class="foo">bar</div>', {
        lang: 'html',
        theme: 'min-dark'
      })`,
      'lang': 'typescript',
      'theme': 'dracula',
      'highlighted-lines': [4, 5],
    })

    const actualOutput = await render(component)

    expect(actualOutput).toMatchInlineSnapshot(
      `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`,
    )
  })

  it('renders the Code Block with different theme and language', async () => {
    const component = h(ECodeBlock, {
      code: `:root {
        --shiki-foreground: #eeeeee;
        --shiki-background: #333333;
        --shiki-token-constant: #660000;
        --shiki-token-string: #770000;
        --shiki-token-comment: #880000;
        --shiki-token-keyword: #990000;
        --shiki-token-parameter: #aa0000;
        --shiki-token-function: #bb0000;
        --shiki-token-string-expression: #cc0000;
        --shiki-token-punctuation: #dd0000;
        --shiki-token-link: #ee0000;
      }`,
      lang: 'css',
      theme: 'vitesse-dark',
    })

    const actualOutput = await render(component)

    expect(actualOutput).toMatchInlineSnapshot(
      `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`,
    )
  })
})
