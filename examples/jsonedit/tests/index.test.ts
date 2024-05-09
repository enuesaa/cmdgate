import { describe, expect, it } from 'vitest'
import { cli } from '../src/index'
import { PromptMock } from '@enuesaa/cmdgate'

describe('jsonedit', () => {
  it('edit', () => {
    const argv = ['node', './bin/jsonedit.js', 'tests/testdata.json', '--path', 'a', '--value', 'c']
    const prompt = new PromptMock()
    cli.prompt = prompt
    cli.run(argv)
    expect(prompt.out).toStrictEqual('{"a":"c"}\n')
  })
  
  it('--help', () => {
    const argv = ['node', './bin/jsonedit.js', '--help']
    const prompt = new PromptMock()
    cli.prompt = prompt
    cli.run(argv)
    expect(prompt.out).toStrictEqual(`jsonedit

Flags:
  --help	Print help message.
  --version	Print version information.
  --path	edit path.
  --value	new value

`)
  })
})
