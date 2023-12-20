# Designdoc
### Usage
```ts
const helpGate = createGate()
const helpFlag = helpGate.boolFlag('--help', { alias: '-h' })
export const helpHandler = helpGate.handle(prompt => {
  if (helpFlag.has()) {

    prompt.exit(0)
  }
})

const aaaGate = createGate()
aaaGate.description('aaa')
const aaaFlag = aaaGate.flag('--aaa', { alias: '-a', required: true })
const bbbArg = aaaGate.argument('bbb')

export const aaaHanlder = aaaGate.handle(prompt => {
  // trigger validate before here.
})

const cmd = createCmd()
cmd.use(helpHandler) // call every time
cmd.use(versionHandler) // call every time
cmd.route("aaa", aaaHandler)
cmd.route("bbb", bbbHandler)
cmd.route("bbb cc", bbbCcHandler)
cmd.run()
```
