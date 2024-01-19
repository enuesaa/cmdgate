import { describe, expect, it } from 'vitest'
import { Flag } from './flag'
import { Parser } from './parser'

describe('flag', () => {
  it('set description', () => {
    const flag = new Flag('--file', {
      description: 'file name',
    })
    expect(flag.config.description).toStrictEqual('file name')
  })

  it('flag.has return true if flag passed.', () => {
    const flag = new Flag('--file')
    const parser = new Parser(['node', 'test.js', '--file', 'sample.json'], '')
    flag.bind(parser)
    expect(flag.has).toStrictEqual(true)
  })

  it('flag.has do not return true if flag missing.', () => {
    const flag = new Flag('--file')
    const parser = new Parser(['node', 'test.js'], '')
    flag.bind(parser)
    expect(flag.has).toStrictEqual(false)
  })

  it('flag.value return passed value', () => {
    const flag = new Flag('--file')
    const parser = new Parser(['node', 'test.js', '--file', 'sample.json'], '')
    flag.bind(parser)
    expect(flag.value).toStrictEqual('sample.json')
  })

  it('flag.value return empty string if flag not passed', () => {
    const flag = new Flag('--file')
    const parser = new Parser(['node', 'test.js'], '')
    flag.bind(parser)
    expect(flag.value).toStrictEqual('')
  })
})
