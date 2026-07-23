import { describe, it, expect } from 'vitest'
import {
  emailComponentPaths,
  getEnabledEmailComponentPaths,
} from '../src/runtime/server/utils/virtual-components'

describe('virtual email components', () => {
  it('excludes ECodeBlock when code highlighting is disabled', () => {
    const components = getEnabledEmailComponentPaths(false)

    expect(components).not.toHaveProperty('ECodeBlock')
    expect(components).toHaveProperty('EText')
    expect(components).toHaveProperty('EButton')
    expect(Object.keys(components)).toHaveLength(Object.keys(emailComponentPaths).length - 1)
  })

  it('keeps ECodeBlock when code highlighting is enabled', () => {
    const components = getEnabledEmailComponentPaths(true)

    expect(components).toHaveProperty('ECodeBlock')
  })
})
