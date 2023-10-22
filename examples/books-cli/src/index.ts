import { createCli } from '@enuesaa/cmdgate'
import { helpHandler } from './help'
import { versionHandler } from './version'
import { lsHandler } from './ls'
import { viewHandler } from './view'

export const cli = createCli()
cli.name('books')
cli.description('books command.')
cli.use(helpHandler)
cli.use(versionHandler)
cli.route('ls', lsHandler)
cli.route('view', viewHandler)
