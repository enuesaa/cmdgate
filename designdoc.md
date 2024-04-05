# Designdoc
## Usage
```ts
export const aaaCmd = createCmd({
  description: 'aaa',
})
const aaaFlag = aaaCmd.flag('--aaa', { alias: '-a' })
const bbbArg = aaaCmd.positional('bbb')
aaaCmd.handle(() => {
  throw 1; // if throw number exit with this code.
  throw 'error message'; // if throw string, exit with this message with exit code 1
})

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
