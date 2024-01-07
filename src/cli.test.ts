import { describe, expect, it } from 'vitest'
import { PromptMock } from './promptmock'
import { createCli, createHandler } from './index'

describe('root command handler', () => {
  it('execute handler', () => {

    const prompt = new PromptMock()

    const rootHandler = createHandler()
    rootHandler.handle(prompt => {
      prompt.info('a')
    })

    const cli = createCli()
    cli.name('sample')
    cli.description('sample command for test')
    cli.use(rootHandler)
    cli.prompt(prompt)
    cli.run()

    expect(prompt.out).toBe('a\n')
  })
})
