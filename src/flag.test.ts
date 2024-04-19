import { describe, expect, it } from 'vitest'
import { Flag } from './flag'

describe('flag configuration', () => {
  it('set description', () => {
    const flag = new Flag('--file', {
      description: 'file name',
    })
    expect(flag.config.description).toStrictEqual('file name')
  })
})

describe('flag get value', () => {
  it('flag.has return true if flag passed', () => {
    const flag = new Flag('--file')
    flag.argv = ['node', 'test.js', '--file', 'sample.json']
    expect(flag.has).toStrictEqual(true)
  })

  it('flag.has do not return true if flag missing', () => {
    const flag = new Flag('--file')
    flag.argv = ['node', 'test.js']
    expect(flag.has).toStrictEqual(false)
  })

  it('flag.value return passed value', () => {
    const flag = new Flag('--file')
    flag.argv = ['node', 'test.js', '--file', 'sample.json']
    expect(flag.value).toStrictEqual('sample.json')
  })

  it('flag.value return empty string if flag not passed', () => {
    const flag = new Flag('--file')
    flag.argv = ['node', 'test.js']
    expect(flag.value).toStrictEqual('')
  })
})
