import { gateli, command } from '../src/index'
import { Prompt } from '../src/prompt'

describe('root command handler', () => {
  let mockPromptPrintln: jest.SpyInstance
  beforeEach(() => {
    mockPromptPrintln = jest.spyOn(Prompt.prototype, 'println').mockImplementation()
  })
  afterEach(() => {
    mockPromptPrintln.mockRestore()
  })

  it('prompt write', () => {
    gateli({
      gate: [
        command('', {
          handler: ({ prompt }) => {
            prompt.println('a')
          },
        })
      ],
    })
    .pass([])
    .exec()
  
    expect(mockPromptPrintln.mock.calls[0][0]).toBe('a')
  })
})