import { gateli, command } from '../src/index'
import process from 'node:process'
import { createMockReadline, writeValue } from './mock/readline'

describe('root command', () => {
  let argv: string[]
  let mockReadline: jest.SpyInstance
  beforeEach(() => {
    argv = process.argv
    mockReadline = createMockReadline()
  })
  afterEach(() => {
    process.argv = argv
  })

  it('root command handler', () => {
    process.argv = ['node', 'jest']

    gateli({
      gate: [
        command('', {
          handler: ({ prompt }) => {
            prompt.println('a')
          },
        })
      ],
    })
    .exec()
  
    expect(writeValue).toMatch('a')
  })
})