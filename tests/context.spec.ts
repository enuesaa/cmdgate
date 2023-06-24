import { createHandler } from '@/index'
import { Context } from '@/context'
import { CommandManifest } from '@/handler/manifest'

describe('context', () => {
  const normalArgv = ['node', 'main.js', 'thisiscontent', '--filename', 'aa.json', '-f', 'json']
  const commandManifest: CommandManifest = {
    name: 'samplecmd',
    description: 'sample command',
    middlewares: [],
    handlers: {},
  }
  
  const normalHandlerManifest = createHandler()
    .argument('content', {})
    .option('--filename', {
      required: true,
    })
    .option('--format', {
      alias: '-f'
    })
    .handle((context, prompt) => {})
    .describeManifest()

  it('context.getArgv should return argv', () => {
    const context = new Context(normalArgv, commandManifest, normalHandlerManifest)
    expect(context.getArgv()).toStrictEqual(['node', 'main.js', 'thisiscontent', '--filename', 'aa.json', '-f', 'json'])
  })

  it('context.validate should return true when args are valid', () => {
    const context = new Context(normalArgv, commandManifest, normalHandlerManifest)
    expect(context.validate()).toStrictEqual(true)
  })

  it('context.validate should return false when argument does not passed', () => {
    const context = new Context(['node', 'main.js'], commandManifest, normalHandlerManifest)
    expect(context.validate()).toStrictEqual(false)
  })

  it('context.validate should return false when unknown option passed', () => {
    const context = new Context(['node', 'main.js', 'thisiscontent', '--aaa', 'bbb'], commandManifest, normalHandlerManifest)
    expect(context.validate()).toStrictEqual(false)
  })

  it('context.validate should return false when required option does not passed', () => {
    // --filename is required.
    const context = new Context(['node', 'main.js', 'thisiscontent'], commandManifest, normalHandlerManifest)
    expect(context.validate()).toStrictEqual(false)
  })

  it('context.getArgs should return argv without nodebin or filename', () => {
    const context = new Context(normalArgv, commandManifest, normalHandlerManifest)
    expect(context.getArgs()).toStrictEqual(['thisiscontent', '--filename', 'aa.json', '-f', 'json'])
  })

  it('context.getArgumentValue should return argument value', () => {
    const context = new Context(normalArgv, commandManifest, normalHandlerManifest)
    expect(context.getArgumentValue('content')).toStrictEqual('thisiscontent')
  })

  it('context.getOptionValue should return option value', () => {
    const context = new Context(normalArgv, commandManifest, normalHandlerManifest)
    expect(context.getOptionValue('--filename')).toStrictEqual('aa.json')
  })

  it('context.getOptionValue should return option value if alias passed', () => {
    const context = new Context(normalArgv, commandManifest, normalHandlerManifest)
    expect(context.getOptionValue('--format')).toStrictEqual('json')
  })
})
