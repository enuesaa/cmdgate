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
import { createCommand, createContext, createHandler } from 'cmdgate'

const context = createContext(c => {
  description: c.description(''),
  aaa: c.flag('--aaa', 'aaa flag'),
  name: c.argument('name'),
})
export const aaaHandler = createHandler(context, (context, prompt) => {
  if (!context.validate()) {
    prompt.exit(1)
  }
})

const handler = createHandler()
handler.description('aaa')
handler.flag('--aa')
handler.main((context, prompt) => {
  
})

const globalContext = createContext(c => {
  help: c.flag('--help', {
    description: 'Print help message. ',
    alias: '-h',
  }),
})
const globalHandler = createHandler(context, (context, prompt) => {
  if (context.help) {
    prompt.info(help())
    return;
  }
  if (!context.validate()) {
    prompt.exit(1)
  }
})

const cli = createCommand()
cli.use(globalHandler)
cli.route("aaa", aaaHandler)
cli.route("bbb", bbbHandler)
cli.route("bbb cc", bbbCcHandler)

cli.run()
```
