import { gateli, command, positional1 } from '../src/index'
import { Prompt } from '../src/prompt'

describe('sub command positional1', () => {
  let mockPromptPrintln: jest.SpyInstance
  beforeEach(() => {
    mockPromptPrintln = jest.spyOn(Prompt.prototype, 'println').mockImplementation()
  })
  afterEach(() => {
    mockPromptPrintln.mockRestore()
  })

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
    .pass(['aaa', 'ccc'])
    .exec()

    expect(mockPromptPrintln.mock.calls[0][0]).toBe('subcommand output. positional1 value is ccc')
  })
})