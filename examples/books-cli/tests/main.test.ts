import { describe, expect, it } from 'vitest'
import { cli } from '../src/index'
import { PromptMock } from '@enuesaa/cmdgate'

describe('books cli', () => {
  it('no flag passed', () => {
    const prompt = new PromptMock(['node', '/workspace/books.js', ''])
    cli.run(prompt)
    expect(prompt.out).toStrictEqual('')
  })

  it('help flag passed', () => {
    const prompt = new PromptMock(['node', '/workspace/books.js', '--help'])
    cli.run(prompt)
    expect(prompt.out).toStrictEqual('help flag passed.\n')
    expect(prompt.code).toStrictEqual(0)
  })

  it('version flag passed', () => {
    const prompt = new PromptMock(['node', '/workspace/books.js', '--version'])
    cli.run(prompt)
    expect(prompt.out).toStrictEqual('books-cli version 0.0.1.\n')
    expect(prompt.code).toStrictEqual(0)
  })
})
