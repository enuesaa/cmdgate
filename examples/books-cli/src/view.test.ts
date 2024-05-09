import { describe, expect, it } from 'vitest'
import { cli } from './index'
import { PromptMock } from '@enuesaa/cmdgate'

describe('subcommand `view`', () => {
  it('--help', () => {
    const argv = ['node', '/workspace/books.js', 'view', '--help']
    const prompt = new PromptMock()
    cli.prompt = prompt
    cli.run(argv)
    expect(prompt.out).toStrictEqual('lookup the book\n')
  })

  it('`view` looks up with book name', () => {
    const argv = ['node', '/workspace/books.js', 'view', 'Explore Paris']
    const prompt = new PromptMock()
    cli.prompt = prompt
    cli.run(argv)
    expect(prompt.out).toStrictEqual(`name: Explore Paris
summary: Discover the beauty and culture of the City of Love.
pageCount: 200
published: 2022-03-15
`)
    expect(prompt.code).toStrictEqual(0)
  })

  it('`view` exits 1 when the book does not exist.', () => {
    const argv = ['node', '/workspace/books.js', 'view', 'not-exists-book-name']
    const prompt = new PromptMock()
    cli.prompt = prompt
    cli.run(argv)
    expect(prompt.code).toStrictEqual(1)
  })
})
