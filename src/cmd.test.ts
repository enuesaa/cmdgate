import { describe, expect, it } from 'vitest'
import { Cmd } from './cmd'

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
    expect(cmd.describeCmd().flags[0]).toStrictEqual(fileFlag)
  })

  it('add positional', () => {
    const cmd = new Cmd()
    const positional = cmd.positional('name')
    expect(cmd.describeCmd().positionals[0]).toStrictEqual(positional)
  })
})
