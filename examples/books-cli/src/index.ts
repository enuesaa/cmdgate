import { createCli } from '@enuesaa/cmdgate'
import { helpHandler } from './help'
import { versionHandler } from './version'
import { lsHandler } from './ls'
import { viewHandler } from './view'

export const cli = createCli({
  name: 'books',
  description: 'books command.',
})
cli.every(helpHandler)
cli.every(versionHandler)
cli.route('ls', lsHandler)
cli.route('view', viewHandler)
