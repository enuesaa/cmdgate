import { createCommand, createHandler } from '@/index'
import { mockPromptPrintln } from './mock/prompt'

describe('root command handler', () => {
  it('execute handler', () => {
    const rootHandler = createHandler()
      .handle((context, prompt) => {
        prompt.info('a')
      })

    const cli = createCommand()
      .name('sample')
      .description('sample command for test')
      .route('', rootHandler);
 
    cli.run(['node', 'cli.js']) // nothing passed. this means calling root command.
  
    expect(mockPromptPrintln.mock.calls[0][0]).toBe('a')
  })
})