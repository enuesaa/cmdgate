import { createHandler } from '@/index'
import { Context } from '@/context'

describe('context', () => {
  const createNormalContext = () => {
    const argv = ['node', 'main.js', 'thisiscontent', '--filename', 'aa.json', '-f', 'json']
    const manifest = createHandler()
      .argument('content', {})
      .option('--filename', {
        required: true,
      })
      .option('--format', {
        alias: '-f'
      })
      .handle((context, prompt) => {})
      .describeManifest()
    return new Context(argv, manifest)
  }

  it('context.getArgs should return argv without nodebin or filename', () => {
    const context = createNormalContext()
    expect(context.getArgs()).toStrictEqual(['thisiscontent', '--filename', 'aa.json', '-f', 'json'])
  })

  it('context.getArgv should return argv', () => {
    const context = createNormalContext()
    expect(context.getArgv()).toStrictEqual(['node', 'main.js', 'thisiscontent', '--filename', 'aa.json', '-f', 'json'])
  })

  it('context.getArgumentValue should return argument value', () => {
    const context = createNormalContext()
    expect(context.getArgumentValue('content')).toStrictEqual('thisiscontent')
  })

  it('context.getOptionValue should return option value', () => {
    const context = createNormalContext()
    expect(context.getOptionValue('--filename')).toStrictEqual('aa.json')
  })

  it('context.getOptionValue should return option value if alias passed', () => {
    const context = createNormalContext()
    expect(context.getOptionValue('--format')).toStrictEqual('json')
  })
})
