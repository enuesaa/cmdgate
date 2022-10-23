import { gateli, command, option } from '../src/index'
import { mockPromptPrintln } from './mock/prompt'

describe('handler args', () => {
  it('sub command handler arg', () => {
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
    .pass(['aaa', '--name', 'vkhbjnkm'])
    .exec()

    expect(mockPromptPrintln.mock.calls[0][0]).toMatchObject({name: 'vkhbjnkm'})
  })

  it('sub command handler arg is invalid', () => {
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
    .pass(['aaa', '--bbb', 'vkhbjnkm'])
    .exec()

    expect(mockPromptPrintln.mock.calls[0][0]).toMatch('invaild option: --bbb')
  })
})