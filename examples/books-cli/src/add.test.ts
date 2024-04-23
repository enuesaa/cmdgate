import { describe, expect, it } from 'vitest'
import { cli } from './index'
import { PromptMock, Argv } from '@enuesaa/cmdgate'

describe('add', () => {
  it('--help', () => {
    cli.argv = new Argv(['node', '/workspace/books.js', 'add', '--help'])
    const prompt = new PromptMock()
    cli.prompt = prompt
    cli.run()
    expect(prompt.out).toStrictEqual('create new book\n')
  })

  it('name is required', () => {
    cli.argv = new Argv(['node', '/workspace/books.js', 'add'])
    const prompt = new PromptMock()
    cli.prompt = prompt
    cli.run()
    expect(prompt.out).toStrictEqual('<name> is required\n')
  })
  
  it('description is required', () => {
    cli.argv = new Argv(['node', '/workspace/books.js', 'add', 'hey'])
    const prompt = new PromptMock()
    cli.prompt = prompt
    cli.run()
    expect(prompt.out).toStrictEqual('<description> is required\n')
  })

  it('description is required', () => {
    cli.argv = new Argv(['node', '/workspace/books.js', 'add', 'hey', 'hello'])
    const prompt = new PromptMock()
    cli.prompt = prompt
    cli.run()
    expect(prompt.out).toStrictEqual(`Note: this command is mock.

name: hey
description: hello
`)
  })
})
