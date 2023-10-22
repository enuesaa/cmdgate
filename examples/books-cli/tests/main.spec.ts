import { cli } from '../src/index'
import { PromptMock } from '@enuesaa/cmdgate'

describe('books cli', () => {
  it('no flag passed', () => {
    const prompt = new PromptMock()
    cli.run(['node', '/workspace/books.js', ''], prompt)
    expect(prompt.out).toStrictEqual('')
  })

  it('help flag passed', () => {
    const prompt = new PromptMock()
    cli.run(['node', '/workspace/books.js', '--help'], prompt)
    expect(prompt.out).toStrictEqual('help flag passed.\n')
    expect(prompt.code).toStrictEqual(0)
  })

  it('version flag passed', () => {
    const prompt = new PromptMock()
    cli.run(['node', '/workspace/books.js', '--version'], prompt)
    expect(prompt.out).toStrictEqual('books-cli version 0.1.0.\n')
    expect(prompt.code).toStrictEqual(0)
  })
})
