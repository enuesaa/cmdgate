# Designdoc
## Usage
~~~ts
import { createCommand, createHandler } from './src/index'

const aaa = createHandler()
  .argument('name')
  .option('--aaa', 'aaa option')
  .description('aaa command.')
  .handle(({context, prompt}) => {
    if (!context.validate()) {
      prompt.exit(1)
    }
  })

const global = createHandler()
  .option('--help', {
    description: 'Print help message. ',
    alias: '-h',
  })
  .handle(({context, prompt, help, version}) => {
    if (!context.validate()) {
      prompt.exit(1)
    }
    if (context.hasOption('--help')) {
      prompt.info(help())
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

### Planning Usage
```ts
import { createCommand, createHandler } from 'cmdgate'

const handler = createHandler()
handler.option('--aa')
handler.main((context, prompt) => {})

const cli = createCommand()
cli.route("aaa", aaaHandler)
cli.route("bbb", bbbHandler)
cli.route("bbb cc", bbbCcHandler)

cli.run()
```
