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
    cmd.cmd('aaa', subcommand)
    cmd.run()
    expect(called).toStrictEqual(true)
  })
})
