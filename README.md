# cmdgate
NodeJS cli helper.

> [!Note]
> Work in progress.. `cmdgate` is currently under development.
> And also, I will make a breaking change.

## Usage
### Simple Example
```ts
import { createCmd } from '@enuesaa/cmdgate'

const app = createCmd()

const helpFlag = app.flag('--help', {
  alias: '-h',
})

app.handle((prompt) => {
  if (helpFlag.has) {
    prompt.print(app.getHelpMessage())
    return 0
  }
})

app.run()
```


### Subcommand Example
```ts
import { createCmd } from '@enuesaa/cmdgate'

export const aaaCmd = createCmd({
  description: 'aaa',
})
aaaCmd.handle(prompt => {
  // write app logic here.

  return 1; // exit code
})
```

```ts
import { createCmd } from '@enuesaa/cmdgate'
import { aaaCmd } from './aaa'

const app = createCmd()

app.cmd('aaa', aaaCmd)

const helpFlag = app.flag('--help', {
  alias: '-h',
})

app.handle((prompt) => {
  if (helpFlag.has) {
    prompt.print(app.getHelpMessage())
    return 0
  }
})

app.run()
```
