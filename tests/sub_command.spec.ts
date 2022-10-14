import { gateli, command } from '../src/index'
import process from 'node:process'
import { createMockReadline, writeValue } from './mock/readline'

describe('sub command', () => {
  let argv: string[]
  let mockReadline: jest.SpyInstance
  beforeEach(() => {
    argv = process.argv
    mockReadline = createMockReadline()
  })
  afterEach(() => {
    process.argv = argv
  })

  it('sub command handler', () => {
    process.argv = ['node', 'jest', 'aaa']

    gateli({
      gate: {
        aaa: command({
          handler: (handle) => {
            handle.prompt.write('subcommand output')
            return true
          }
        })
      },
    })
    .exec()

    expect(writeValue).toMatch('subcommand output')
  })
})