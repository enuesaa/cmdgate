import { gateli, command } from '../src/index'
import { promises as readline } from 'node:readline'
import process from 'node:process'

describe('sub command', () => {
  let argv: string[]
  let mockReadline: jest.SpyInstance
  let writeValue: any
  beforeEach(() => {
    argv = process.argv
    mockReadline = jest.spyOn(readline, 'createInterface').mockImplementationOnce(() => ({
      question: (value: any) => true,
      write: (value: any) => {
        writeValue = value
        return true
      },
      close: () => true,
    } as any))
  })
  afterEach(() => {
    mockReadline.mockRestore()
    process.argv = argv
  })

  test('sub command handler', () => {
    process.argv = ['node', 'jest', 'aaa']

    gateli({
      gate: {
        aaa: command({
          handler: (arg, prompt) => {
            prompt.write('subcommand output')
            return true
          }
        })
      },
    })
    .exec()

    expect(writeValue).toMatch('subcommand output')
  })
})