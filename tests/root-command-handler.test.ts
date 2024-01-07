import { describe, expect, it } from 'vitest'
import { createCli, createHandler } from '../src'
import { mockPromptPrintln } from './mock/prompt'

describe('root command handler', () => {
  it('execute handler', () => {

    const rootHandler = createHandler()
    rootHandler.handle(prompt => {
      prompt.info('a')
    })

    const cli = createCli()
    cli.name('sample')
    cli.description('sample command for test')
    cli.use(rootHandler);
 
    cli.run() // nothing passed. this means calling root command.
  
    expect(mockPromptPrintln.mock.calls[0][0]).toBe('a')
  })
})
