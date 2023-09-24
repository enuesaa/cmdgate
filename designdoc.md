# Designdoc
### Usage
```ts
export const aaaHandelr = createHandler(c => {
  c.description('aaa')
  const aaaFlag = c.flag('--aaa', { alias: '-a', required: true })
  const bbbArg = c.argument('bbb')

  if (!c.validate()) {
    return c.showHelp()
  }

  something(aaaFlag, bbbArg)
})

export const globalHandler = createHandler(c => {
  const helpFlag = c.flag('--help')
  if (helpFlag.value()) {
    return c.showHelp()
  }
})

const cli = createCommand()
cli.use(globalHandler)
cli.route("aaa", aaaHandler)
cli.route("bbb", bbbHandler)
cli.route("bbb cc", bbbCcHandler)

cli.run()
```
