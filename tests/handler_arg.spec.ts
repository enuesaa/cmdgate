import { gateli, command, option } from '../src/index'
import { createMockReadline, writeValue } from './mock/readline'
import process from 'node:process'

describe('handler args', () => {
  let argv: string[]
  let mockReadline: jest.SpyInstance
  beforeEach(() => {
    argv = process.argv
    mockReadline = createMockReadline()
  })
  afterEach(() => {
    process.argv = argv
  })

  it('sub command handler arg', () => {
    process.argv = ['node', 'jest', 'aaa', '--name', 'vkhbjnkm']

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
    .exec()

    expect(writeValue).toMatch("{ '--name': 'vkhbjnkm' }\n")
  })
})