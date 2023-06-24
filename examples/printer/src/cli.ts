import { createCommand, createHandler } from '../../../dist'

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
    console.log(context.getHelpMessage())
    return;
    // 後続のhandlerがあるためバリデーションが上手くいかない
    // if (!context.validate()) {
    //   prompt.exit(1)
    //   return;
    // }
    if (context.hasOption('--help')) {
      prompt.info(context.getHelpMessage())
      return;
    }
    if (context.hasOption('--version')) {
      prompt.info(context.getVersionMessage())
      return;
    }
  })

const rootCmd = createHandler()
  .argument('message', {})
  .handle((context, prompt) => {
    if (!context.validate()) {
      prompt.info('something wrong with argments.')
      prompt.exit(1);
      return;
    }
    prompt.info('aa')
    const message = context.getArgumentValue('message')
    console.log(message)
  })

const cli = createCommand()
  .name('printer')
  .description('sample command.')
  .use(global)
  .route('', rootCmd)

cli.run()
