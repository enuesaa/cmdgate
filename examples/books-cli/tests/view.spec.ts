import { cli } from '../src/index'
import { PromptMock } from '@enuesaa/cmdgate'

describe('ls command', () => {
  it('ls command lists book names', () => {
    const prompt = new PromptMock()
    cli.run(['node', '/workspace/books.js', 'view', 'Explore Paris'], prompt)
    expect(prompt.out).toStrictEqual(`name: Explore Paris
summary: Discover the beauty and culture of the City of Love.
pageCount: 200
published: 2022-03-15
`)
  })
})
