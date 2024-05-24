# cmdgate
NodeJS cli helper.

> [!Note]
> Work in progress.. `cmdgate` is currently under development.

## Usage
```ts
export const aaaCmd = createCmd({
  description: 'aaa',
})
const aaaFlag = aaaCmd.flag('--aaa', { alias: '-a' })
const bbbArg = aaaCmd.positional('bbb')
aaaCmd.handle(() => {
  return 1; // exit code
})

const cli = createCmd()
cli.cmd("aaa", aaaCmd)

const helpFlag = cli.flag('--help', { alias: '-h' })
cli.handle((prompt) => {
  if (helpFlag.has) {
    prompt.print(cli.getHelpMessage())
    return 0
  }
})
cli.run()
```
