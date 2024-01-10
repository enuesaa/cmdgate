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

export const aaaCmd = createCommand({
  name: 'aaa',
  description: 'aaa',
})
const aaaFlag = aaaCmd.flag('--aaa', { alias: '-a', required: true })
const bbbArg = aaaCmd.argument('bbb')
aaaCmd.handle(prompt => {
  // trigger validate before here.
})

const cli = createCli()
cli.every(helpHanlder) // call every time
cli.every(versionHandler) // call every time
cli.route(aaaCmd)
cli.route("bbb", bbbHandler)
cli.route("bbb cc", bbbCcHandler)
cli.run()
```
