import { gateli, command, option } from '../src/index'
import { Prompt } from '../src/prompt'

describe('handler args', () => {
  const mockPromptPrintln = jest.spyOn(Prompt.prototype, 'println').mockImplementation()
  afterEach(() => {
    mockPromptPrintln.mockRestore()
  })

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
    .withArgs(['aaa', '--name', 'vkhbjnkm'])
    .exec()

    expect(mockPromptPrintln.mock.calls[0][0]).toMatchObject({name: 'vkhbjnkm'})
  })
})