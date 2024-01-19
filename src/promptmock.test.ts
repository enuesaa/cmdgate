import { describe, expect, it } from 'vitest'
import { PromptMock } from './promptmock'

describe('promptmock', () => {
  it('extract messages', () => {
    const promptmock = new PromptMock()
    promptmock.info('aaa')
    promptmock.info('bbb')
    expect(promptmock.out).toStrictEqual('aaa\nbbb\n')
  })
})
