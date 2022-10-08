import { gateli, command, option, help, positional1, positional2, positionals } from './src/index'

gateli({
  name: 'a',
  description: 'b',
  handler: () => { console.log('a'); return true },
  gate: {
    add: command({
      handler: (arg) => {
        console.log(arg)
        console.log('add')
        return true
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
//     '--help': help({ alias: '-h' }),
//   }
// })
// .exec()
