import { describe, expect, it } from 'vitest'
import { Cmd } from './cmd'

describe('cmd', () => {
  it('cmd description', () => {
    const cmd = new Cmd({
      description: 'this is cmd',
    })
    expect(cmd.config.description).toStrictEqual('this is cmd')
  })
})
