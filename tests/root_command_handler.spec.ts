import { gateli, command } from '../src/index'
import { createMockReadline, writeValue } from './mock/readline'

describe('root command handler', () => {
  let mockReadline: jest.SpyInstance
  beforeEach(() => {
    mockReadline = createMockReadline()
  })

  it('prompt write', () => {
    gateli({
      gate: [
        command('', {
          handler: ({ prompt }) => {
            prompt.println('a')
          },
        })
      ],
    })
    .exec([])
  
    expect(writeValue).toMatch('a')
  })
})