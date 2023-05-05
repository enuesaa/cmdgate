import { createCommand, createGate } from '@/index'


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
    // steps
    //   .handler(checkNeedHelpHandler)
    //   .handler(checkNeedVersionHandler)
    //   .on('needHelp', showHelpMessageHandler) // abort
    //   .on('needVersion', showVersionMessageHandler)
    return steps
  })


const cli = createCommand()
  .name('sample')
  .description('sample comand.')
  .use(global)

cli.run()
