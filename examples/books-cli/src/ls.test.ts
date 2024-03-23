import { describe, expect, it } from 'vitest'
import { cli } from './index'
import { PromptMock } from '@enuesaa/cmdgate'

describe('subcommand `ls`', () => {
  it('--help', () => {
    cli.argv = ['node', '/workspace/books.js', 'ls', '--help']
    const prompt = new PromptMock()
    cli.prompt = prompt
    cli.run()
    expect(prompt.out).toStrictEqual(`list books

Flags:
  --search: search books with name prefix
`)
  })

  it('`ls` lists book names', () => {
    cli.argv = ['node', '/workspace/books.js', 'ls']
    const prompt = new PromptMock()
    cli.prompt = prompt
    cli.run()
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