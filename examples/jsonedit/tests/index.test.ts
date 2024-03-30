import { describe, expect, it } from 'vitest'
import { cli } from '../src/index'
import { PromptMock } from '@enuesaa/cmdgate'

describe('jsonedit', () => {
  it('edit', () => {
    cli.argv = ['node', './bin/jsonedit.js', 'tests/testdata.json', '--path', 'a', '--value', 'c']
    const prompt = new PromptMock()
    cli.prompt = prompt
    cli.run()
    expect(prompt.out).toStrictEqual('{"a":"c"}\n')
  })
})
