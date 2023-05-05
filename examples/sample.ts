import { createCommand, createGate } from '@/index'
import type { Handler } from '@/index'

const checkNeedHelpHandler: Handler = (context) => {
  console.log('a')
  return context
}

const global = createGate()
  .option('--help', {
    description: 'Print help message. ',
    alias: '-h',
  })
  .option('--version', {
    description: 'Print version information. ',
    alias: '-v',
  })
  .steps(steps => {
    steps
      .handler(checkNeedHelpHandler)
      .handler(checkNeedHelpHandler)
      .on('needHelp', checkNeedHelpHandler) // abort
      .on('needVersion', checkNeedHelpHandler)
    return steps
  })


const cli = createCommand()
  .name('sample')
  .description('sample comand.')
  .use(global)

cli.run()
