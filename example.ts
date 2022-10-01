import { gateli, command, option, help, positional1, positional2, positionalArgs, optionValue } from './src/index'

gateli({
  _name: 'a',
  _description: 'b',
  add: command({
    _handler: () => { console.log('add'); return {} }
  }),
  _handler: () => { console.log('a'); return {} }
})
.exec()

// gateli({
//   _name: 'example-package-manager',
//   _description: 'example-package-manager cli',

//   init: command({
//     name: positional1(),
//   }),

//   add: command({
//     name: positional1(),
//     '--dev': option(),
//   }),

//   remove: command({
//     name: positional1(),
//   }),

//   upgrade: command(),
//   run: command(),

//   search: command({
//     name: positional1(),
//   }),

//   plguins: command({
//     add: command(),
//     remove: command(),
//     search: command({
//       name: positional1(),
//     }),
//   }),

//   '--help': help({ alias: '-h', global: true }),
// })
// .exec()
