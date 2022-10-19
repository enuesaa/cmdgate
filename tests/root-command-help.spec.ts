import { gateli, command, helpOption, option } from '../src/index'
import { Prompt } from '../src/prompt'

describe('root command help', () => {
  let mockPromptPrintln: jest.SpyInstance
  beforeEach(() => {
    mockPromptPrintln = jest.spyOn(Prompt.prototype, 'println').mockImplementation()
  })
  afterEach(() => {
    mockPromptPrintln.mockRestore()
  })

  it('help', () => {
    gateli({
      gate: [
        command('', {
          param: {
            aaa: option('--aaa'),
            help: helpOption('--help'),
          },
          handler: ({ prompt }) => {
            prompt.println('a')
          },
        })
      ],
    })
    .withArgs(['--help'])
    .exec()
  
    expect(mockPromptPrintln.mock.calls[0][0]).toBe('\n\n\ncommands:\n  \n\noptions:\n  --aaa\n')
  })
})