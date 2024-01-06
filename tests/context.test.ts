import { describe, expect, it } from 'vitest'
import { createHandler } from '../src/index'
import { Context } from '../src/context'

describe('context', () => {
  const normalArgv = ['node', 'main.js', 'thisiscontent', '--filename', 'aa.json', '-f', 'json']
  const rootHander = createHandler()
  rootHander.argument('content', { description: '' })
  rootHander.flag('--filename', { required: true })
  rootHander.flag('--format', { alias: '-f' })
  rootHander.main(prompt => {})

  it('context.getArgv should return argv', () => {
    const context = new Context(normalArgv)
    expect(context.argv).toStrictEqual(['node', 'main.js', 'thisiscontent', '--filename', 'aa.json', '-f', 'json'])
  })

  it('context.getRawArgs should return argv without nodebin or filename', () => {
    const context = new Context(normalArgv)
    expect(context.rawArgs).toStrictEqual(['thisiscontent', '--filename', 'aa.json', '-f', 'json'])
  })

  it('context.getRawPositionals should return positional arguments', () => {
    const context = new Context(normalArgv)
    expect(context.rawPositionals).toStrictEqual(['thisiscontent'])
  })

  it('context.getRawFlags should return flags.', () => {
    const context = new Context(normalArgv)
    expect(context.rawFlags['--filename']).toStrictEqual(['aa.json'])
  })
})
