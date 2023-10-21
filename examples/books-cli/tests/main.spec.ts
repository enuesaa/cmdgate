import { cli } from '../src/index'
import { PromptMock } from '@enuesaa/cmdgate'

describe('books cli normal test', () => {
  it('help flag passed', () => {
    const prompt = new PromptMock()
    cli.run(['node', '/workspace/books.js', '--help'], prompt)
    expect(prompt.out).toStrictEqual('help flag passed.\n')
  })
})
