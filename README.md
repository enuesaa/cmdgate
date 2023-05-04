**Work in progress..**
# gateli
## Usage
~~~ts
import { createCommand, createRoute } from './src/main'

const aaaRoute = createRoute()
  .argument('name')
  .description('aaa command.')
  .handler(validationHandler)
  .handler(startPromptIfMissingArgHandler)
  .handler(mainHandler)

const cli = createCommand()
  .name('sample')
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
