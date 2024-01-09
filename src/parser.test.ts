import { describe, expect, it } from 'vitest'
import { Parser } from './parser'

describe('parser normal test', () => {
  const argv = ['node', 'main.js', 'thisiscontent', '--filename', 'aa.json']

  it('parser getArgv', () => {
    const parser = new Parser(argv)
    expect(parser.getArgv()).toStrictEqual(argv)
  })

  it('parser getRawArgs', () => {
    const parser = new Parser(argv)
    expect(parser.getRawArgs()).toStrictEqual(['thisiscontent', '--filename', 'aa.json'])
  })

  it('parser hasFlag true', () => {
    const parser = new Parser(argv)
    expect(parser.hasFlag('--filename')).toStrictEqual(true)
  })

  it('parser hasFlag false', () => {
    const parser = new Parser(argv)
    expect(parser.hasFlag('--not-exist')).toStrictEqual(false)
  })

  it('parser getFlagValue', () => {
    const parser = new Parser(argv)
    expect(parser.getFlagValue('--filename')).toStrictEqual('aa.json')
  })

  it('parser listMatchableRoutes', () => {
    const parser = new Parser(argv)
    expect(parser.listMatchableRoutes()).toStrictEqual(['thisiscontent'])
  })
})

describe('parser complex', () => {
  const argv = ['node', 'main.js', 'thisiscontent', 'thismaypositional', '--filename', 'aa.json', '--use']

  it('parser listMatchableRoutes', () => {
    const parser = new Parser(argv)
    expect(parser.listMatchableRoutes()).toStrictEqual(['thisiscontent', 'thisiscontent thismaypositional'])
  })
})
