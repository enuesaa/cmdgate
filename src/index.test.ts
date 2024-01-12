import { describe, expect, it } from 'vitest'
import { createCmd, PromptMock } from './index'

describe('root command handler', () => {
  it('execute handler', () => {
    const prompt = new PromptMock()

    const cli = createCmd({
      description: 'sample command for test',
    })
    cli.prompt = prompt

    cli.handle((prompt) => {
      prompt.info('a')
    })
    cli.run()

    expect(prompt.out).toBe('a\n')
  })
})
