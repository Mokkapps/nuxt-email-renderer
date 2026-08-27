import { describe, expect, it } from 'vitest'
import { extractPaddingFromStyle } from './extract-padding'

describe('extractPaddingFromStyle', () => {
  it('returns undefined for both when style is undefined', () => {
    const { paddingStyle, remainingStyle } = extractPaddingFromStyle(undefined)
    expect(paddingStyle).toBeUndefined()
    expect(remainingStyle).toBeUndefined()
  })

  it('returns undefined for both when style is empty', () => {
    const { paddingStyle, remainingStyle } = extractPaddingFromStyle({})
    expect(paddingStyle).toBeUndefined()
    expect(remainingStyle).toBeUndefined()
  })

  it('extracts padding into paddingStyle', () => {
    const { paddingStyle, remainingStyle } = extractPaddingFromStyle({ padding: '20px' })
    expect(paddingStyle).toEqual({ padding: '20px' })
    expect(remainingStyle).toBeUndefined()
  })

  it('extracts individual padding properties', () => {
    const { paddingStyle, remainingStyle } = extractPaddingFromStyle({
      paddingTop: '10px',
      paddingRight: '20px',
      paddingBottom: '10px',
      paddingLeft: '20px',
    })
    expect(paddingStyle).toEqual({
      paddingTop: '10px',
      paddingRight: '20px',
      paddingBottom: '10px',
      paddingLeft: '20px',
    })
    expect(remainingStyle).toBeUndefined()
  })

  it('keeps non-padding styles in remainingStyle', () => {
    const { paddingStyle, remainingStyle } = extractPaddingFromStyle({ backgroundColor: 'red', color: 'blue' })
    expect(paddingStyle).toBeUndefined()
    expect(remainingStyle).toEqual({ backgroundColor: 'red', color: 'blue' })
  })

  it('splits mixed padding and non-padding styles', () => {
    const { paddingStyle, remainingStyle } = extractPaddingFromStyle({
      padding: '10px',
      backgroundColor: 'green',
      fontSize: '16px',
    })
    expect(paddingStyle).toEqual({ padding: '10px' })
    expect(remainingStyle).toEqual({ backgroundColor: 'green', fontSize: '16px' })
  })

  it('handles kebab-case padding properties', () => {
    const { paddingStyle, remainingStyle } = extractPaddingFromStyle({
      'padding-top': '5px',
      'padding-bottom': '5px',
      'color': 'black',
    } as Record<string, string>)
    expect(paddingStyle).toEqual({ 'padding-top': '5px', 'padding-bottom': '5px' })
    expect(remainingStyle).toEqual({ color: 'black' })
  })
})
