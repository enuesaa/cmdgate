import { describe, expect, it } from 'vitest'
import { cli } from '../src/index'
import { PromptMock, Argv } from '@enuesaa/cmdgate'

describe('jsonedit', () => {
  it('edit', () => {
    cli.argv = new Argv(['node', './bin/jsonedit.js', 'tests/testdata.json', '--path', 'a', '--value', 'c'])
    const prompt = new PromptMock()
    cli.prompt = prompt
    cli.run()
    expect(prompt.out).toStrictEqual('{"a":"c"}\n')
  })
  
  it('--help', () => {
    cli.argv = new Argv(['node', './bin/jsonedit.js', '--help'])
    const prompt = new PromptMock()
    cli.prompt = prompt
    cli.run()
    expect(prompt.out).toStrictEqual(`jsonedit

Flags:
  --help	Print help message.
  --version	Print version information.
  --path	edit path.
  --value	new value

`)
  })
})
