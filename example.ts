import { gateli, command, option, help, positional1, positional2, positionalArgs, optionValue } from './src/a'

// gateli({
//   _name: 'a',
//   _description: 'b',
//   add: command({
//     _handler: () => { console.log('add'); return {} }
//   }),
//   _handler: () => { console.log('a'); return {} }
// })
// .exec()

gateli({
  name: 'example-package-manager',
  description: 'example-package-manager cli',
  with: {
    'init': command({
      with: {
        'name': positional1()
      }
    }),
    'add': command({
      with: {
        'name': positional1(),
        '--dev': option(),       
      }
    }),
    'remove': command({
      with: {
        name: positional1(),
      },
    }),
    'upgrade': command(),
    'run': command(),
    'search': command({
      with: {
        'name': positional1(),
      },
    }),
    'plguins': command({
      with: {
        'add': command(),
        'remove': command(),
        'search': command({
          with: {
            'name': positional1(),
          },
        }),
      },
    }),
    '--help': help({ alias: '-h', global: true }),
  }
})
.exec()
