**Work in progress..**
# cmdgate
## Usage
~~~ts
import { createCommand, createGate, validationHandler } from './src/index'

// state
type AaaStates = 'init'|'validationSucceeded'|'validationFailed'

const aaa = createGate()
  .argument('name')
  .option('--aaa', 'aaa option')
  .description('aaa command.')
  .steps((steps: Steps<AaaStates>) => {
    steps
      .handler(validationHandler) // (context) => { context.args }
      .handler(mainHandler)
      .on('validationFailed', startPromptIfMissingArgHandler)
    return steps
  })

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
      .handler(checkNeedVersionHandler)
      .on('needHelp', showHelpMessageHandler) // abort
      .on('needVersion', showVersionMessageHandler)
    return steps
  })

const cli = createCommand()
  .name('sample')
  .use(global)
  .gate('aaa', aaa)
  .gate('bbb cc', bbb)

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
