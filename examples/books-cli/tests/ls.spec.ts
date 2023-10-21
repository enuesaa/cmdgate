import { cli } from '../src/index'
import { PromptMock } from '@enuesaa/cmdgate'

describe('subcommand ls', () => {
  it('subcommand ls lists book names', () => {
    const prompt = new PromptMock()
    cli.run(['node', '/workspace/books.js', 'ls'], prompt)
    expect(prompt.out).toStrictEqual(`Explore Paris
Journey to the Grand Canyon
Adventures in Rome
Beaches of Bali
African Safari Tales
Hiking the Swiss Alps
Mysteries of Machu Picchu
Cruising the Caribbean
A Taste of Thailand
Hiking the Rockies
`)
    expect(prompt.code).toStrictEqual(0)
  })
})