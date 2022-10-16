import { gateli, command, helpOption } from '../src/index'
import { Prompt } from '../src/prompt'

describe('root command help', () => {
  const mockPromptPrintln = jest.spyOn(Prompt.prototype, 'println').mockImplementation()
  afterEach(() => {
    mockPromptPrintln.mockRestore()
  })

  it('help', () => {
    gateli({
      gate: [
        command('', {
          param: {
            help: helpOption('--help')
          },
          handler: ({ prompt }) => {
            prompt.println('a')
          },
        })
      ],
    })
    .withArgs(['--help'])
    .exec()
  
    expect(mockPromptPrintln.mock.calls[0][0]).toMatch('default help message')
  })
})