import { createCommand } from '@/index'
import { globalGate } from './global'
import { addGate } from './add'

const cli = createCommand()
  .name('sample')
  .description('Sample application that imitated package manager.')
  .use(globalGate)
  .gate('add', addGate)

cli.run()
