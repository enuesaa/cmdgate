import { gateli, command, option } from '../src/index'
import { promises as readline } from 'node:readline'
import process from 'node:process'

describe('handler args', () => {
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

  test('sub command handler arg', () => {
    process.argv = ['node', 'jest', 'aaa', '--name', 'vkhbjnkm']

    gateli({
      gate: {
        aaa: command({
          handler: (arg, prompt) => {
            prompt.write(JSON.stringify(arg))
            return true
          },
          gate: {
            '--name': option({})
          }
        })
      },
    })
    .exec()

    expect(writeValue).toMatch('{"--name":"vkhbjnkm"}')
  })
})