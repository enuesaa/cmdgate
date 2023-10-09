import { createCli } from '../../../dist'
import { helpHandler } from './help'
import { versionHandler } from './version'
import { mainHandler } from './main'

const cli = createCli()
cli.name('printer')
cli.description('sample command')
cli.use(helpHandler)
cli.use(versionHandler)
cli.use(mainHandler)
cli.run()
