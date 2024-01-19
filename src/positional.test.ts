import { describe, expect, it } from 'vitest'
import { Positional } from './positional'
import { Parser } from './parser'

describe('positional', () => {
  it('set description', () => {
    const positional = new Positional('name', {
      description: 'file name',
    })
    expect(positional.config.description).toStrictEqual('file name')
  })

  it('positional.has return true when arg passed', () => {
    const positional = new Positional('name')
    const parser = new Parser(['node', 'test.js', 'aaa'], '')
    positional.bind(parser, 0, '')
    expect(positional.has).toStrictEqual(true)
  })

  it('positional.value return value when arg passed', () => {
    const positional = new Positional('name')
    const parser = new Parser(['node', 'test.js', 'aaa'], '')
    positional.bind(parser, 0, '')
    expect(positional.value).toStrictEqual('aaa')
  })
})
