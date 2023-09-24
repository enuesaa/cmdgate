# Designdoc
### Usage
```ts
export const aaaHandelr = createCommand(c => {
  c.description('aaa')
  c.flag('--aaa', { alias: '-a', required: true })
  c.argument('bbb')
  c.main(() => {})
})

const cli = createCommand(c => {
  c.route("aaa", aaaHandler)
  c.route("bbb", bbbHandler)
  c.route("bbb cc", bbbCcHandler)
})
cli.onhelp(() => {})
cli.run()
```
