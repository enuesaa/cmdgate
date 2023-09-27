# Designdoc
### Usage
```ts
const helpGate = createGate()
helpGate.boolFlag('--help', { alias: '-h' })

export const helpHandler = handle(helpGate, (c, prompt) => {
  const { helpFlag } = helpGate.parse()
  if (helpFlag) {

    prompt.exit(0)
  }
})

const aaaGate = createGate()
aaaGate.description('aaa')
aaaGate.flag('--aaa', { alias: '-a', required: true })
aaaGate.argument('bbb')

export const aaaHandelr = handle(aaaGate, (c, prompt) => {
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
