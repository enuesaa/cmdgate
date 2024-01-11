import { createCmd } from '@enuesaa/cmdgate'
import { lsCmd } from './ls'
import { viewCmd } from './view'

export const cli = createCmd({
  description: 'books command.',
})

const helpFlag = cli.flag('--help', {
  alias: '-h',
  description: 'Print help message.',
  required: false,
})
cli.handle(prompt => {
  if (helpFlag.has) {
    prompt.info('help flag passed.')
    prompt.exit(0)
  }
})

const versionFlag = cli.flag('--version', {
  description: 'Print version information.',
  required: false,
})
cli.handle(prompt => {
  if (versionFlag.has) {
    prompt.info('books-cli version 0.0.1.')
    prompt.exit(0)
  }
})
cli.route('ls', lsCmd)
cli.route('view', viewCmd)
cli.run()
