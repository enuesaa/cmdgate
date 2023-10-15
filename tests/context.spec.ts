import { createHandler } from '../src/index'
import { Context } from '../src/context'
import { type CliConfig } from '../src/cli'

describe('context', () => {
  const normalArgv = ['node', 'main.js', 'thisiscontent', '--filename', 'aa.json', '-f', 'json']
  const rootHander = createHandler()
  rootHander.argument('content', { description: '' })
  rootHander.flag('--filename', { required: true })
  rootHander.flag('--format', { alias: '-f' })
  rootHander.main((context, prompt) => {

  })

  const commandConfig: CliConfig = {
    name: 'samplecmd',
    description: 'sample command',
    version: '',
    middlewares: [],
    handlers: {
      '': rootHander,
    },
  }

  it('context.getArgv should return argv', () => {
    const context = new Context(normalArgv)
    expect(context.getArgv()).toStrictEqual(['node', 'main.js', 'thisiscontent', '--filename', 'aa.json', '-f', 'json'])
  })

  it('context.getRawArgs should return argv without nodebin or filename', () => {
    const context = new Context(normalArgv)
    expect(context.getRawArgs()).toStrictEqual(['thisiscontent', '--filename', 'aa.json', '-f', 'json'])
  })

  it('context.getRawPositionals should return positional arguments', () => {
    const context = new Context(normalArgv)
    expect(context.getRawPositionals()).toStrictEqual(['thisiscontent'])
  })

  it('context.getRawFlags should return flags.', () => {
    const context = new Context(normalArgv)
    expect(context.getRawFlags()['--filename']).toStrictEqual(['aa.json'])
  })
})
