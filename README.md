**Work in progress..**
# gateli
## Usage
~~~ts
import { createCommand, createRoute, createContext, validator } from './src/main'

// state
type AaaStates = 'init'|'validationSucceeded'|'validationFailed'
type AdditionalData = {a: 'b'}
const aaaContext = createContext<AaaStates, AdditionalData>()

const aaaGate = createGate()
  .context(aaaContext)
  .handler(validationHandler) // (context) => { context.args }
  .handler(mainHandler)
  .on('validationFailed', startPromptIfMissingArgHandler)
  .gate('ddd', dddHandler)

const aaaRoute = createRoute()
  .argument('name')
  .option('--aaa', 'aaa option')
  .description('aaa command.')
  .gate(aaaGate)

// type guard 的なことをできればいいけど, 難しいだろうなあ

const mainGate = createGate()
  .handler(checkNeedHelpHandler)
  .handler(checkNeedVersionHandler)
  .on('needHelp', helpMessagePresenter)
  .on('needVersion', versionMessagePresenter)

const cli = createCommand()
  .name('sample')
  .option('--help', 'help option')
  .option('--version', 'version option')
  .gate(mainGate)
  .route('aaa', aaaRoute)
  .route('bbb cc', aaaRoute)

cli.run()
~~~

## Memo
### フレームワークではなくライブラリにしたい
規模によるがNodeJSでCLIツールを作るのは簡単である.. 
ただしヘルプメッセージを構築したり、コマンドライン引数を扱うときにヘルパーツールが欲しくなるので、ライブラリ的でありたい

## http middleware のように層を重ねる感じにしたい
[gin](https://github.com/gin-gonic/gin) のように handler を重ねられればベスト
