# Designdoc
## Usage
~~~ts
import { createCommand, createHandler } from './src/index'

const aaa = createHandler()
  .argument('name')
  .option('--aaa', 'aaa option')
  .description('aaa command.')
  .handle((context, prompt) => {
    // anything welcome here.

    if (!context.validate()) {
      prompt.exit(1)
    }
  })

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

const cli = createCommand()
  .name('sample')
  .use(global)
  .route('aaa', aaa)
  .route('bbb cc', bbb)

cli.run()
~~~

## Memo
## http middleware のように層を重ねる感じにしたい
[gin](https://github.com/gin-gonic/gin) のように handler を重ねられればベスト


## TODO
- Check tsconfig settings. Undefined variables like `window` are suggested in vscode.
