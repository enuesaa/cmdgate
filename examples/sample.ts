import { createCommand } from '@/index'

const cli = createCommand()
  .name('sample')
  .description('sample comand.')
  .option('--help', {
    description: 'Print help message. ',
    alias: '-h',
  })

cli.run()
