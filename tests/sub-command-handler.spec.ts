import { gateli, command } from '../src/index'
import { mockPromptPrintln } from './mock/prompt'

describe('sub command handler', () => {
  it('execute handler', () => {
    gateli({
      gate: [
        command('', {}),
        command('aaa', {
          handler: ({ prompt }) => {
            prompt.println('subcommand output')
          }
        })
      ],
    })
    .pass(['aaa'])
    .exec()

    expect(mockPromptPrintln.mock.calls[0][0]).toBe('subcommand output')
  })
})