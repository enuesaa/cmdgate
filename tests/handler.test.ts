import { describe, expect, it } from 'vitest'
import { Handler } from '../src/handler'

describe('handler', () => {
  it('handler description', () => {
    const handler = new Handler()
    handler.setDescription('this is handler')
    expect(handler.description).toStrictEqual('this is handler')
  })
})
