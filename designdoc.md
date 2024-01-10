# Designdoc
### Usage
```ts
const helpFlag = createFlag('--help', { alias: '-h' })
export const helpHandler = helpFlag.onGiven(prompt => {
  // helpFlag
})

export const aaaCmd = createCmd({
  description: 'aaa',
})
const aaaFlag = createFlag('--aaa', { alias: '-a', required: true })
const bbbArg = createPositional('bbb')
export const aaaCmd = createHandler(prompt => {

})

const cli = createCmd()
cli.every(helpHandler) // call every time
cli.every(versionHandler) // call every time
cli.route(aaaCmd)
cli.route("bbb", bbbHandler)
cli.route("bbb cc", bbbCcHandler)
cli.run()
```
