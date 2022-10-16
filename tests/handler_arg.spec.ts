import { gateli, command, option } from '../src/index'
import { createMockReadline, writeValue } from './mock/readline'

describe('handler args', () => {
  let mockReadline: jest.SpyInstance
  beforeEach(() => {
    mockReadline = createMockReadline()
  })

  it('sub command handler arg', () => {
    gateli({
      gate: [
        command('aaa', {
          param: {
            name: option('--name'),
          },
          handler: ({ args, prompt }) => {
            prompt.println(args)
          },
        })
      ],
    })
    .exec(['aaa', '--name', 'vkhbjnkm'])

    expect(writeValue).toMatch("{ '--name': 'vkhbjnkm' }\n")
  })
})