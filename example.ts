import { gateli, command, option, help, positional1, positional2, positionals } from '@/index'

gateli({
  name: 'example-package-manager',
  description: 'example-package-manager cli',
  gate: {

    'version': command({
      handler: (arg) => {
        console.log('version: 0.1.0')
        return true
      }
    }),

    'init': command({
      // gate: {
      //   'name': positional1()
      // }
    }),

    'add': command({
      // gate: {
      //   'name': positional1(),
      //   '--dev': option(),       
      // }
    }),

    'remove': command({
      // gate: {
      //   name: positional1(),
      // },
    }),

    // 'upgrade': command(),
    // 'run': command(),
    // 'search': command({
    //   gate: {
    //     'name': positional1(),
    //   },
    // }),
    // 'plguins': command({
    //   gate: {
    //     'add': command(),
    //     'remove': command(),
    //     'search': command({
    //       gate: {
    //         'name': positional1(),
    //       },
    //     }),
    //   },
    // }),
    // '--help': help({ alias: '-h' }),
  }
})
.exec()
