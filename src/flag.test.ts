import { describe, expect, it } from 'vitest'
import { Flag } from './flag'

describe('flag', () => {
  it('set description', () => {
    const flag = new Flag('--file', {
      description: 'file name',
    })
    expect(flag.config.description).toStrictEqual('file name')
  })
})
