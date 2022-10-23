import { gateli, command, option } from '../src/index'
import { mockPromptPrintln } from './mock/prompt'

describe('sub command option', () => {
  it('sub command option name', () => {
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

  it('sub command option name', () => {
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