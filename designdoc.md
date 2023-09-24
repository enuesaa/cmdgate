# Designdoc
### Usage
```ts
export const aaaHandelr = createHandler(c => {
  c.description('aaa')
  const aaaFlag = c.flag('--aaa', { alias: '-a' })
  const bbbArg = c.argument('bbb')

  c.on('validation', () => !aaaFlag.isNull())
})

export const globalHandler = createHandler(c => {
  const helpFlag = c.flag('--help')

  c.on('validation', () => helpFlag.isNull())
})

const cli = createCommand()
cli.use(globalHandler)
cli.route("aaa", aaaHandler)
cli.route("bbb", bbbHandler)
cli.route("bbb cc", bbbCcHandler)

cli.run()
```
