import { createCli } from '../../../dist'
import { helpHandler } from './help'
import { versionHandler } from './version'
import { rootCmd } from './root'

const cli = createCli()
cli.name('printer')
cli.description('sample command')
cli.use(helpHandler)
cli.use(versionHandler)
cli.route('', rootCmd)
cli.run()
