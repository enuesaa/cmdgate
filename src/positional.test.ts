import { describe, expect, it } from 'vitest'
import { Positional } from './positional'

describe('positional', () => {
  it('set description', () => {
    const positional = new Positional('name', {
      description: 'file name',
    })
    expect(positional.config.description).toStrictEqual('file name')
  })
})
