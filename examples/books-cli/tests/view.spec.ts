import { cli } from '../src/index'
import { PromptMock } from '@enuesaa/cmdgate'

describe('subcommand `view`', () => {
  it('`view` looks up with book name', () => {
    const prompt = new PromptMock(['node', '/workspace/books.js', 'view', 'Explore Paris'])
    cli.run(prompt)
    expect(prompt.out).toStrictEqual(`name: Explore Paris
summary: Discover the beauty and culture of the City of Love.
pageCount: 200
published: 2022-03-15
`)
    expect(prompt.code).toStrictEqual(0)
  })

  it('`view` exits 1 when the book does not exist.', () => {
    const prompt = new PromptMock(['node', '/workspace/books.js', 'view', 'not-exists-book-name'])
    cli.run(prompt)
    expect(prompt.code).toStrictEqual(1)
  })
})
