import { gateli, command, option } from '../src/index'
import { mockPromptPrintln } from './mock/prompt'

describe('sub command option', () => {
  it('pass args to handler', () => {
    gateli({
      gate: [
        command('aaa', {
          param: {
            name: option('--name'),
          },
          handler: ({ args, prompt }) => {
            prompt.println(args)
          },
        })
      ],
    })
    .pass(['aaa', '--name', 'vkhbjnkm'])
    .exec()

    expect(mockPromptPrintln.mock.calls[0][0]).toMatchObject({name: 'vkhbjnkm'})
  })

  it('invalid option', () => {
    gateli({
      gate: [
        command('aaa', {
          param: {
            name: option('--name'),
          },
          handler: ({ args, prompt }) => {
            prompt.println(args)
          },
        })
      ],
    })
    .pass(['aaa', '--bbb', 'vkhbjnkm'])
    .exec()

    expect(mockPromptPrintln.mock.calls[0][0]).toMatch('invalid option: --bbb')
  })

  it('pass boolean value to handler', () => {
    gateli({
      gate: [
        command('', {}),
        command('aaa', {
          param: {
            bbb: option('---bbb', { alias: null })
          },
          handler: ({ args,  prompt }) => {
            prompt.println(`subcommand output. args.bbb is ${args.bbb}`)
          },
        })
      ],
    })
    .pass(['aaa', '---bbb'])
    .exec()

    expect(mockPromptPrintln.mock.calls[0][0]).toBe('subcommand output. args.bbb is true')
  })

  it('alias', () => {
    gateli({
      gate: [
        command('', {}),
        command('aaa', {
          param: {
            bbb: option('---bbb', { alias: '-b' })
          },
          handler: ({ args,  prompt }) => {
            prompt.println(`subcommand output. args.bbb is ${args.bbb}`)
          },
        })
      ],
    })
    .pass(['aaa', '-b'])
    .exec()

    expect(mockPromptPrintln.mock.calls[0][0]).toBe('subcommand output. args.bbb is true')
  })
})