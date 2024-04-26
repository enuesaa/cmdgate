import { describe, expect, it } from 'vitest'
import { Positional } from './positional'
import { Argv } from './argv'

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
    const positional = new Positional('name', { position: 0 })
    positional.argv = new Argv(argv)
    expect(positional.has).toStrictEqual(true)
  })

  it('positional.value return value when arg passed', () => {
    const positional = new Positional('name', { position: 0 })
    positional.argv = new Argv(argv)
    expect(positional.value).toStrictEqual('aaa')
  })
})

describe('multiple position', () => {
  it('positional.value return value', () => {
    const positional = new Positional('name', { position: 1 })
    positional.argv = new Argv(['node', 'test.js', 'aaa', 'bbb'])
    expect(positional.value).toStrictEqual('bbb')
  })

  it('positional.value return value in that position', () => {
    const positional = new Positional('name', { position: 2 })
    positional.argv = new Argv(['node', 'test.js', 'aaa', 'bbb', 'ccc', 'ddd'])
    expect(positional.value).toStrictEqual('ccc')
  })

  it('positional.value return empty value if value does not exist in expected position', () => {
    const positional = new Positional('name', { position: 2 })
    positional.argv = new Argv(['node', 'test.js', 'aaa', 'bbb'])
    expect(positional.value).toStrictEqual('')
  })
})

describe('positional complex', () => {
  it('positional.listPositionals() remove flags', () => {
    const positional = new Positional('name', { position: 2 })
    positional.argv = new Argv(['node', 'main.js', 'thisiscontent', 'thismaypositional', '--filename', 'aa.json', '--use'])
    expect(positional._positionals).toStrictEqual(['thisiscontent', 'thismaypositional'])
  })

  it('positional.listPositionals() remove flags', () => {
    const positional = new Positional('name', { position: 2 })
    positional.argv = new Argv(['node', 'main.js', 'thisiscontent', 'thismaypositional', '--filename', 'aa.json', '--use'])
    expect(positional._positionals).toStrictEqual(['thisiscontent', 'thismaypositional'])
  })
})
