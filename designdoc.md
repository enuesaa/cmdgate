# Designdoc
### Usage
```ts
const helpGate = createGate({
  description: 'this is help',
})
const helpFlag = helpGate.boolFlag('--help', { alias: '-h' })
export const helpHandler = helpGate.handle(prompt => {
  if (helpFlag.has()) {

    prompt.exit(0)
  }
})

const aaaGate = createGate({
  description: 'aaa',
})
const aaaFlag = aaaGate.flag('--aaa', { alias: '-a', required: true })
const bbbArg = aaaGate.argument('bbb')
export const aaaHandler = aaaGate.handle(prompt => {
  // trigger validate before here.
})

const cli = createCli()
cli.use(helpHanlder) // call every time
cli.use(versionHandler) // call every time
cli.route("aaa", aaaHandler)
cli.route("bbb", bbbHandler)
cli.route("bbb cc", bbbCcHandler)
cli.run()
```
