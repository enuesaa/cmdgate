import { gateli, command, positional1, positional2 } from '../src/index'
import { mockPromptPrintln } from './mock/prompt'

describe('sub command positionals', () => {
  it('sub command positional1', () => {
    gateli({
      gate: [
        command('', {}),
        command('aaa', {
          param: {
            bbb: positional1({})
          },
          handler: ({ args,  prompt }) => {
            prompt.println(`subcommand output. positional1 value is ${args.bbb}`)
          },
        })
      ],
    })
    .pass(['aaa', 'val'])
    .exec()

    expect(mockPromptPrintln.mock.calls[0][0]).toBe('subcommand output. positional1 value is val')
  })

  it('sub command positional1 and positional2', () => {
    gateli({
      gate: [
        command('', {}),
        command('aaa', {
          param: {
            bbb: positional1({}),
            ccc: positional2({}),
          },
          handler: ({ args,  prompt }) => {
            prompt.println(`subcommand output. positional1 value is ${args.bbb}. positional2 value is ${args.ccc}`)
          },
        })
      ],
    })
    .pass(['aaa', 'val1', 'val2'])
    .exec()

    expect(mockPromptPrintln.mock.calls[0][0]).toBe('subcommand output. positional1 value is val1. positional2 value is val2')
  })
})