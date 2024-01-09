import { describe, expect, it } from 'vitest'
import { createCli, createGate, PromptMock } from './index'

describe('root command handler', () => {
  it('execute handler', () => {
    const prompt = new PromptMock()

    const rootGate = createGate()
    const rootHandler = rootGate.handle((prompt) => {
      prompt.info('a')
    })

    const cli = createCli({
      name: 'sample',
      description: 'sample command for test',
    })

    cli.every(rootHandler)
    cli.prompt = prompt
    cli.run()

    expect(prompt.out).toBe('a\n')
  })
})
