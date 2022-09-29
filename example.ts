import createGateli from './src/index'

// gateli({
//   aaa: command({
//     hanlder: handler,
//     options: {
//       input: option({}),
//     }
//   }),
//   bbb: command(),
//   ccc: command(),
//   help: option({
//     short: 'h',
//     long: 'help',
//     global: true,
//   })
// })

const cli = createGateli({
  definitions: {
    aaa: {
      handler: (): void => { console.log('heyaaa'); },
      definitions: {
        '--help': {handler: (): void => { console.log('heyaaa-help'); }},
        'bbb': {handler: (): void => { console.log('heybbb'); }},
      }
    }
  },
})
await cli.parseArgs()
