import { gateli, command } from '../src/index'
import { Prompt } from '../src/prompt'

describe('sub command', () => {
  let mockPromptPrintln: jest.SpyInstance
  beforeEach(() => {
    mockPromptPrintln = jest.spyOn(Prompt.prototype, 'println').mockImplementation()
  })
  afterEach(() => {
    mockPromptPrintln.mockRestore()
  })

  it('sub command handler', () => {
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