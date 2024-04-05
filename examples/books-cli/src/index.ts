import { createCmd } from '@enuesaa/cmdgate'
import { lsCmd } from './ls'
import { viewCmd } from './view'
import { addCmd } from './add'

export const cli = createCmd({
  description: 'books command.',
})

const helpFlag = cli.flag('--help', {
  alias: '-h',
  description: 'Print help message.',
})
const versionFlag = cli.flag('--version', {
  description: 'Print version information.',
})
cli.handle(prompt => {
  if (helpFlag.has) {
    prompt.print(cli.getHelpMessage())
    return 0
  }
  if (versionFlag.has) {
    prompt.info('books-cli version 0.0.1.')
    return 0
  }
})

cli.cmd('ls', lsCmd)
cli.cmd('view', viewCmd)
cli.cmd('add', addCmd)
