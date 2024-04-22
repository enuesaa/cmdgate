import { describe, expect, it } from 'vitest'
import { getRawArgs } from './parseutil'

describe('parser normal test', () => {
  it('getRawArgs()', () => {
    expect(getRawArgs(['node', 'main.js', 'thisiscontent', '--filename', 'aa.json'])).toStrictEqual(['thisiscontent', '--filename', 'aa.json'])
  })
})
