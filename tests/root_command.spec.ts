import { gateli } from '../src/index'
import { promises as readline } from 'node:readline'

describe('root command', () => {
  test('root command handler', () => {
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
      handler: (arg, prompt) => {
        prompt.write('a')
        return true
      }
    })
    .exec()
    expect(writeValue).toMatch('a')
  })
})