import { describe, expect, it } from 'vitest'
import { cli } from './index'
import { PromptMock } from '@enuesaa/cmdgate'

describe('books cli', () => {
  it('no flag passed', () => {
    cli.argv = ['node', '/workspace/books.js', '']
    const prompt = new PromptMock()
    cli.prompt = prompt
    cli.run()
    expect(prompt.out).toStrictEqual('')
  })

  it('help flag passed', () => {
    cli.argv = ['node', '/workspace/books.js', '--help']
    const prompt = new PromptMock()
    cli.prompt = prompt
    cli.run()
    expect(prompt.out).toStrictEqual(`books command.

Commands:
  ls
  view
  add

Flags:
  --help: Print help message.
  --version: Print version information.

`)
    expect(prompt.code).toStrictEqual(0)
  })

  it('version flag passed', () => {
    cli.argv = ['node', '/workspace/books.js', '--version']
    const prompt = new PromptMock()
    cli.prompt = prompt
    cli.run()
    expect(prompt.out).toStrictEqual('books-cli version 0.0.1.\n')
    expect(prompt.code).toStrictEqual(0)
  })
})
