import { gateli, command } from '../src/index'
import { mockPromptPrintln } from './mock/prompt'

describe('root command handler', () => {
  it('execute handler', () => {
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