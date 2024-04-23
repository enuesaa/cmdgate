import { describe, expect, it } from 'vitest'
import { Flag } from './flag'
import { Argv } from './argv'

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
    flag.argv =  new Argv(['node', 'test.js', '--file', 'sample.json'])
    expect(flag.has).toStrictEqual(true)
  })

  it('flag.has do not return true if flag missing', () => {
    const flag = new Flag('--file')
    flag.argv =  new Argv(['node', 'test.js'])
    expect(flag.has).toStrictEqual(false)
  })

  it('flag.value return passed value', () => {
    const flag = new Flag('--file')
    flag.argv =  new Argv(['node', 'test.js', '--file', 'sample.json'])
    expect(flag.value).toStrictEqual('sample.json')
  })

  it('flag.value return empty string if flag not passed', () => {
    const flag = new Flag('--file')
    flag.argv =  new Argv(['node', 'test.js'])
    expect(flag.value).toStrictEqual('')
  })
})

describe('flag normal test', () => {
  const argv = ['node', 'main.js', 'thisiscontent', '--filename', 'aa.json']

  it('flag.has true', () => {
    const flag = new Flag('--filename')
    flag.argv =  new Argv(argv)
    expect(flag.has).toStrictEqual(true)
  })

  it('flag.has false', () => {
    const flag = new Flag('--not-exist')
    flag.argv =  new Argv(argv)
    expect(flag.has).toStrictEqual(false)
  })

  it('flag.value return its value', () => {
    const flag = new Flag('--filename')
    flag.argv =  new Argv(argv)
    expect(flag.value).toStrictEqual('aa.json')
  })
})
