import { describe, expect, it } from 'vitest'
import { Cmd } from './cmd'
import { PromptMock } from './promptmock'

describe('cmd', () => {
  it('set description', () => {
    const cmd = new Cmd({
      description: 'this is cmd',
    })
    expect(cmd.config.description).toStrictEqual('this is cmd')
  })

  it('add flag', () => {
    const cmd = new Cmd()
    const fileFlag = cmd.flag('--file')
    expect(cmd.flags[0]).toStrictEqual(fileFlag)
  })

  it('add positional', () => {
    const cmd = new Cmd()
    const positional = cmd.positional('name')
    expect(cmd.positionals[0]).toStrictEqual(positional)
  })

  it('cmd call handler', () => {
    const cmd = new Cmd()
    cmd.prompt = new PromptMock()
    cmd.argv = ['node', 'test.js']
    let called = false
    cmd.handle((prompt) => {
      called = true
    })
    cmd.run()
    expect(called).toStrictEqual(true)
  })

  it('cmd call sub command', () => {
    let called = false
    const subcommand = new Cmd()
    subcommand.handle((prompt) => {
      called = true
    })

    const cmd = new Cmd()
    cmd.prompt = new PromptMock()
    cmd.argv = ['node', 'test.js', 'aaa']
    cmd.route('aaa', subcommand)
    cmd.run()
    expect(called).toStrictEqual(true)
  })
})

describe('sub cmd', () => {
  it('inherit flag', () => {
    const subcommand = new Cmd()

    const cmd = new Cmd()
    cmd.prompt = new PromptMock()
    cmd.argv = ['node', 'test.js', 'aaa']
    const fileFlag = cmd.flag('--file')
    cmd.route('aaa', subcommand)
    cmd.run()
    expect(subcommand.inheritFlags).toStrictEqual([fileFlag])
  })
})
