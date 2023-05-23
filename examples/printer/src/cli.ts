import { createCommand, createHandler } from 'cmdgate'

const global = createHandler()
  .option('--help', {
    description: 'Print help message. ',
    alias: '-h',
  })
  .option('--version', {
    description: 'Print version information. ',
    alias: '-v',
  })
  .handle((context, prompt) => {
    if (!context.validate()) {
      prompt.exit(1)
    }
    if (context.hasFlag('--help')) {
      prompt.showHelpMessage()
      return;
    }
    if (context.hasFlag('--version')) {
      prompt.showVersionInformation()
      return;
    }
  })

const rootCmd = createHandler()
  .argument('message', {
    required: true,
  })
  .handle((context, prompt) => {
    console.log(context.getArg('message'))
  })

const cli = createCommand()
  .name('printer')
  .description('sample command.')
  .use(global)
  .route('', rootCmd)

cli.run()
