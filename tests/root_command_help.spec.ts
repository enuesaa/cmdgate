import { gateli, command, helpOption } from '../src/index'
import { createMockReadline, writeValue } from './mock/readline'

describe('root command help', () => {
  let mockReadline: jest.SpyInstance
  beforeEach(() => {
    mockReadline = createMockReadline()
  })

  it('help', () => {
    gateli({
      gate: [
        command('', {
          param: {
            help: helpOption('--help')
          },
          handler: ({ prompt }) => {
            prompt.println('a')
          },
        })
      ],
    })
    .exec(['--help'])
  
    expect(writeValue).toMatch('command help message')
  })
})