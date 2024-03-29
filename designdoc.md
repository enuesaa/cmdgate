# Designdoc
## Usage
```ts
export const aaaCmd = createCmd({
  description: 'aaa',
})
const aaaFlag = aaaCmd.flag('--aaa', { alias: '-a' })
const bbbArg = aaaCmd.positional('bbb')
aaaCmd.handle(() => {})

const cli = createCmd()
cli.cmd("aaa", aaaCmd)
cli.cmd("bbb", bbbCmd)
cli.cmd("bbb cc", bbbCcCmd)

const helpFlag = cli.flag('--help', { alias: '-h' })
cli.handle(() => {})
cli.run()
```

## Use Cases
### Parse process.argv in prototype app.
```ts
const cli = createCmd()
const aaa = cli.flag('--aaa', { alias: '-a' })
cli.parse()

if (aaa.has) {
  console.error('aaa flag is required.')
}
```
