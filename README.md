# cmdgate
NodeJS cli helper.

> [!Note]
> Work in progress.. `cmdgate` is currently under development.
> And also, I will make a breaking change.

## Usage
```ts
// subcommand
export const aaaCmd = createCmd({
  description: 'aaa',
})
// handler
aaaCmd.handle(prompt => {
  // write app logic here.

  return 1; // exit code
})
```

```ts
import { aaaCmd } from './aaa'

// cli
const cli = createCmd()

// register subcommands
cli.cmd("aaa", aaaCmd)

// flag
const helpFlag = cli.flag('--help', { alias: '-h' })
cli.handle((prompt) => {
  if (helpFlag.has) {
    prompt.print(cli.getHelpMessage())
    return 0
  }
})

// run
cli.run()
```
