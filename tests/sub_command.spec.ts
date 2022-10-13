import { gateli, command } from '../src/index'
import { promises as readline } from 'node:readline'
import process from 'node:process'

describe('sub command', () => {
  /** @see https://stackoverflow.com/questions/71476237/how-to-mock-or-stub-process-argv */
  let argv: string[]
  beforeEach(() => {
    argv = process.argv
  })

  afterEach(() => {
    process.argv = argv
  })

  test('sub command handler', () => {
    let writeValue: any;
    const mockReadline = jest.spyOn(readline, 'createInterface').mockImplementationOnce(() => ({
      question: (value: any) => true,
      write: (value: any) => {
        /** @todo fix another way */
        writeValue = value
        return true
      },
      close: () => true,
    } as any))

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