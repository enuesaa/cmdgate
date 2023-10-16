# Designdoc
### Usage
```ts
export const helpHandler = createHandler()
const helpFlag = helpHandler.boolFlag('--help', { alias: '-h' })

helpHandler.main(prompt => {
  if (helpFlag.has()) {

    prompt.exit(0)
  }
})

export const aaaHandler = createHandler()
aaaHandler.description('aaa')
const aaaFlag = aaaHandler.flag('--aaa', { alias: '-a', required: true })
const bbbArg = aaaHandler.argument('bbb')

aaaHandler.main(prompt => {
  // trigger validate before here.
})

const cli = createCli()
cli.use(helpHandler) // call every time
cli.use(versionHandler) // call every time
cli.route("aaa", aaaHandler)
cli.route("bbb", bbbHandler)
cli.route("bbb cc", bbbCcHandler)
cli.run()
```
