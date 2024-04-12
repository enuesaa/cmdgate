import { describe, expect, it } from 'vitest'
import { Positional } from './positional'
import { Parser } from './parser'

describe('positional configuration', () => {
  it('set description', () => {
    const positional = new Positional('name', {
      description: 'file name',
    })
    expect(positional.config.description).toStrictEqual('file name')
  })
})

describe('positional get value', () => {
  const argv = ['node', 'test.js', 'aaa']

  it('positional.has return true when arg passed', () => {
    const positional = new Positional('name', {position: 0})
    const parser = new Parser(argv, '')
    positional.bind(parser)
    expect(positional.has).toStrictEqual(true)
  })

  it('positional.value return value when arg passed', () => {
    const positional = new Positional('name', {position: 0})
    const parser = new Parser(argv, '')
    positional.bind(parser)
    expect(positional.value).toStrictEqual('aaa')
  })
})

describe('multiple position', () => {
  it('positional.value return value', () => {
    const positional = new Positional('name', {position: 1})
    const parser = new Parser(['node', 'test.js', 'aaa', 'bbb'], '')
    positional.bind(parser)
    expect(positional.value).toStrictEqual('bbb')
  })

  it('positional.value return value in that position', () => {
    const positional = new Positional('name', {position: 2})
    const parser = new Parser(['node', 'test.js', 'aaa', 'bbb', 'ccc', 'ddd'], '')
    positional.bind(parser)
    expect(positional.value).toStrictEqual('ccc')
  })

  it('positional.value return empty value if value does not exist in expected position', () => {
    const positional = new Positional('name', {position: 2})
    const parser = new Parser(['node', 'test.js', 'aaa', 'bbb'], '')
    positional.bind(parser)
    expect(positional.value).toStrictEqual('')
  })
})
