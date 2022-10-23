import { gateli, command, helpOption, option } from '../src/index'
import { mockPromptPrintln } from './mock/prompt'

describe('root command help', () => {
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
    .pass(['--help'])
    .exec()
  
    expect(mockPromptPrintln.mock.calls[0][0]).toBe('\n\n\ncommands:\n  \n\noptions:\n  --aaa\n')
  })
})