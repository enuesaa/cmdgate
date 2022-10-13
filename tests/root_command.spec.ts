import { gateli } from '../src/index'
import { promises as readline } from 'node:readline'
import process from 'node:process'

describe('root command', () => {
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

  test('root command handler', () => {
    process.argv = ['node', 'jest']

    gateli({
      handler: (arg, prompt) => {
        prompt.write('a')
        return true
      }
    })
    .exec()
  
    expect(writeValue).toMatch('a')
  })
})