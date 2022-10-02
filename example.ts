import { gateli, command, option, help, positional1, positional2, positionalArgs, optionValue } from './src/index'

gateli({
  name: 'a',
  description: 'b',
  handler: () => { console.log('a'); return {} },
  gate: {
    add: command({
      handler: () => {
        console.log('b')
        return {}
      }
    })
  }
})
.exec()

// gateli({
//   name: 'example-package-manager',
//   description: 'example-package-manager cli',
//   gate: {
//     'init': command({
//       gate: {
//         'name': positional1()
//       }
//     }),
//     'add': command({
//       gate: {
//         'name': positional1(),
//         '--dev': option(),       
//       }
//     }),
//     'remove': command({
//       gate: {
//         name: positional1(),
//       },
//     }),
//     'upgrade': command(),
//     'run': command(),
//     'search': command({
//       gate: {
//         'name': positional1(),
//       },
//     }),
//     'plguins': command({
//       gate: {
//         'add': command(),
//         'remove': command(),
//         'search': command({
//           gate: {
//             'name': positional1(),
//           },
//         }),
//       },
//     }),
//     '--help': help({ alias: '-h', global: true }),
//   }
// })
// .exec()
