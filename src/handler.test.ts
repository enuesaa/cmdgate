import { describe, expect, it } from 'vitest'
import { Handler } from './handler'

describe('handler', () => {
  it('handler description', () => {
    const handler = new Handler()
    handler.description('this is handler')
    expect(handler.describeHandler().description).toStrictEqual('this is handler')
  })
})
