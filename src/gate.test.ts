import { describe, expect, it } from 'vitest'
import { Gate } from './gate'

describe('gate', () => {
  it('gate description', () => {
    const gate = new Gate({
      description: 'this is handler',
    })
    expect(gate.config.description).toStrictEqual('this is handler')
  })
})
