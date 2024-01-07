# Designdoc
### Usage
```ts
export const helpGate = createGate({
  description: 'this is help',
})

const helpFlag = helpGate.boolFlag('--help', { alias: '-h' })

helpGate.main(prompt => {
  if (helpFlag.has()) {

    prompt.exit(0)
  }
})

export const aaaGate = createGate({
  description: 'aaa',
})

const aaaFlag = aaaGate.flag('--aaa', { alias: '-a', required: true })
const bbbArg = aaaGate.argument('bbb')

aaaGate.main(prompt => {
  // trigger validate before here.
})

const cmd = createCmd()
cmd.use(helpGate) // call every time
cmd.use(versionGate) // call every time
cmd.route("aaa", aaaGate)
cmd.route("bbb", bbbGate)
cmd.route("bbb cc", bbbCcGate)
cmd.run()
```
