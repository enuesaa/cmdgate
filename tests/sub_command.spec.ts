import { gateli, command } from '../src/index'
import { createMockReadline, writeValue } from './mock/readline'

describe('sub command', () => {
  let mockReadline: jest.SpyInstance
  beforeEach(() => {
    mockReadline = createMockReadline()
  })

  it('sub command handler', () => {
    gateli({
      gate: [
        command('', {}),
        command('aaa', {
          handler: ({ prompt }) => {
            prompt.println('subcommand output')
          }
        })
      ],
    })
    .exec(['aaa'])

    expect(writeValue).toMatch('subcommand output')
  })
})