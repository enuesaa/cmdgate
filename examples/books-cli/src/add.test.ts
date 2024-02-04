import { describe, expect, it } from 'vitest'
import { cli } from './index'
import { PromptMock } from '@enuesaa/cmdgate'

describe('add', () => {
  it('name is required', () => {
    cli.argv = ['node', '/workspace/books.js', 'add']
    const prompt = new PromptMock()
    cli.prompt = prompt
    cli.run()
    expect(prompt.out).toStrictEqual('<name> is required\n')
  })
  
  it('description is required', () => {
    cli.argv = ['node', '/workspace/books.js', 'add', 'hey']
    const prompt = new PromptMock()
    cli.prompt = prompt
    cli.run()
    expect(prompt.out).toStrictEqual('<description> is required\n')
  })

  it('description is required', () => {
    cli.argv = ['node', '/workspace/books.js', 'add', 'hey', 'hello']
    const prompt = new PromptMock()
    cli.prompt = prompt
    cli.run()
    expect(prompt.out).toStrictEqual(`Note: this command is mock.

name: hey
description: hello
`)
  })
})
