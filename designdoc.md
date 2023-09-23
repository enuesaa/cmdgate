# Designdoc
## Usage
~~~ts
import { createCommand, createHandler } from './src/index'

const aaa = createHandler()
  .argument('name')
  .option('--aaa', 'aaa option')
  .description('aaa command.')
  .handle(({context, prompt}) => {
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
  .handle(({context, prompt, help, version}) => {
    if (!context.validate()) {
      prompt.exit(1)
    }
    if (context.hasOption('--help')) {
      prompt.info(help())
      return;
    }
    if (context.hasOption('--version')) {
      prompt.info(version())
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

### Planning
```ts
import { createCommand, createHandler, createHandlerConfig } from './src/index'

const aaaHandler = createHandler()
aaaHandler.option('--aa')
aaaHandler.main((context, prompt) => {

})

const config = {
  description: description(''),
  aaa: option('--aaa').required(),
}
export const aaaHandler = createHanlder(config, (context, prompt) => {

})

const cli = createCommand()
cli.route("aaa", aaaHandler)
cli.route("bbb", bbbHandler)
cli.route("bbb cc", bbbCcHandler)

cli.run()
```

## Memo
## http middleware のように層を重ねる感じにしたい
[gin](https://github.com/gin-gonic/gin) のように handler を重ねられればベスト
