# Designdoc
### Usage
```ts
export const aaaCmd = createCmd({
  description: 'aaa',
})
const aaaFlag = aaaCmd.flag('--aaa', { alias: '-a', required: true })
const bbbArg = aaaCmd.Positional('bbb')
aaaCmd.handle(() => {})

const cli = createCmd()
cli.route("aaa", aaaCmd)
cli.route("bbb", bbbCmd)
cli.route("bbb cc", bbbCcCmd)

const helpFlag = cli.flag('--help', { alias: '-h' })
cli.handle(() => {})
cli.run()
```
