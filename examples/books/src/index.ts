import { createCli } from '../../../dist'
import { helpHandler } from './help'
import { versionHandler } from './version'
import { lshandler } from './ls'
import { viewhandler } from './view'

const cli = createCli()
cli.name('books')
cli.description('sample command')
cli.use(helpHandler)
cli.use(versionHandler)
cli.route('ls', lshandler)
cli.route('view', viewhandler)
cli.run()
