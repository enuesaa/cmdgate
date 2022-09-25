import createGateli from './src/index'

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
