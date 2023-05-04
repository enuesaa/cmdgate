**Work in progress..**
# cmdgate
commandgate

## Usage
~~~ts
import { createCommand, createRoute, createContext, validationHandler } from './src/main'

// state
type AaaStates = 'init'|'validationSucceeded'|'validationFailed'
type AdditionalData = {a: 'b'}

const aaa = createRoute()
  .argument('name')
  .option('--aaa', 'aaa option')
  .description('aaa command.')
  .gate(req => {
    const aaaContext = createContext<AaaStates, AdditionalData>()
    req
      .context(aaaContext)
      .handler(validationHandler) // (context) => { context.args }
      .handler(mainHandler)
      .on('validationFailed', startPromptIfMissingArgHandler)
    return req
  })

// type guard 的なことをできればいいけど, 難しいだろうなあ

const cli = createCommand()
  .name('sample')
  .option('--help', 'help option')
  .option('--version', 'version option')
  .gate(req => {
    req
      .handler(checkNeedHelpHandler)
      .handler(checkNeedVersionHandler)
      .on('needHelp', showHelpMessageHandler) // abort
      .on('needVersion', showVersionMessageHandler)
    return req
  })
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
