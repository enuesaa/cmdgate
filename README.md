# cmdgate
NodeJS cli helper.

> [!Note]
> Work in progress.. `cmdgate` is currently under development.

## Usage
```ts
export const aaaCmd = createCmd({
  description: 'aaa',
})
aaaCmd.handle(prompt => {
  // write app logic here.

  return 1; // exit code
})
```

```ts
import { aaaCmd } from './aaa'

const cli = createCmd()
cli.cmd("aaa", aaaCmd)

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
