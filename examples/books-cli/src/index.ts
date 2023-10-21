import { createCli } from '@enuesaa/cmdgate'
import { helpHandler } from './help'
import { versionHandler } from './version'
import { lshandler } from './ls'
import { viewhandler } from './view'

export const cli = createCli()
cli.name('books')
cli.description('books command.')
cli.use(helpHandler)
cli.use(versionHandler)
cli.route('ls', lshandler)
cli.route('view', viewhandler)
