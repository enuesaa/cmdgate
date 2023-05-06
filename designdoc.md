# Designdoc

## Usage
~~~ts
import { createCommand, createHandler, validationHandler } from './src/index'

// state
type AaaStates = 'init'|'validationSucceeded'|'validationFailed'

const aaa = createHandler()
  .argument('name')
  .option('--aaa', 'aaa option')
  .description('aaa command.')
  .steps((context) => {
    // anything welcome here.

    if (!validate(context)) {
      prompt()
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
  .steps(context => {
    if (!validate(context)) {
      prompt()
    }
    if (hasHelpFlag(context)) {
      showHelpMessage()
      return;
    }
    if (hasVersionFlag(context)) {
      showVersionInformation()
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
### フレームワークではなくライブラリにしたい
規模によるがNodeJSでCLIツールを作るのは簡単である.. 
ただしヘルプメッセージを構築したり、コマンドライン引数を扱うときにヘルパーツールが欲しくなるので、ライブラリ的でありたい

## http middleware のように層を重ねる感じにしたい
[gin](https://github.com/gin-gonic/gin) のように handler を重ねられればベスト


## TODO
- Check tsconfig settings. Undefined variables like `window` are suggested in vscode.
