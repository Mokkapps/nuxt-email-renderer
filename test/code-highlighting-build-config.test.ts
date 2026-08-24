import { describe, expect, it } from 'vitest'
import {
  applyCodeHighlightingBuildConfig,
  CODE_HIGHLIGHTING_DEFINE,
} from '../src/code-highlighting-build-config'

describe('applyCodeHighlightingBuildConfig', () => {
  it('writes the code highlighting flag to both esbuild define and Nitro replace', () => {
    const nitroConfig = {
      esbuild: {
        options: {
          define: {
            __EXISTING_DEFINE__: '"kept"',
          },
        },
      },
      replace: {
        __EXISTING_REPLACE__: '"kept"',
      },
    }

    applyCodeHighlightingBuildConfig(nitroConfig, false)

    expect(nitroConfig.esbuild.options.target).toBe('es2020')
    expect(nitroConfig.esbuild.options.define).toEqual({
      __EXISTING_DEFINE__: '"kept"',
      [CODE_HIGHLIGHTING_DEFINE]: 'false',
    })
    expect(nitroConfig.replace).toEqual({
      __EXISTING_REPLACE__: '"kept"',
      [CODE_HIGHLIGHTING_DEFINE]: 'false',
    })
  })

  it('preserves an existing esbuild target', () => {
    const nitroConfig = {
      esbuild: {
        options: {
          target: 'es2022',
        },
      },
    }

    applyCodeHighlightingBuildConfig(nitroConfig, true)

    expect(nitroConfig.esbuild.options.target).toBe('es2022')
    expect(nitroConfig.esbuild.options.define).toEqual({
      [CODE_HIGHLIGHTING_DEFINE]: 'true',
    })
    expect(nitroConfig.replace).toEqual({
      [CODE_HIGHLIGHTING_DEFINE]: 'true',
    })
  })
})
