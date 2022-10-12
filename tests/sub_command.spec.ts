import { gateli, command } from '../src/index'
import { promises as readline } from 'node:readline'

describe('sub command', () => {
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
    .setArgs(['aaa'])
    .exec()
    expect(writeValue).toMatch('subcommand output')
  })
})