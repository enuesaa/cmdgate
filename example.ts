import { gateli, command, option, help, positional1, positional2, positionals } from '@/index'

gateli({
  name: 'example-package-manager',
  description: 'example-package-manager cli',
  gate: {

    'version': command({
      handler: (arg) => {
        console.log('version: 0.1.0')
        return true
      },
    }),

    'init': command({
      handler: (arg) => {
        console.log(arg.name)
        return true
      },
      gate: {
        'name': positional1({})
      }
    }),

    'add': command({
      handler: (arg) => {
        console.log(arg)
        return true
      },
      gate: {
        'name': positional1({}),
        '--dev': option({}),
      }
    }),

    'remove': command({
      gate: {
        name: positional1({}),
      },
    }),

    'upgrade': command({}),
    'run': command({}),
    'search': command({
      gate: {
        'name': positional1({}),
      },
    }),
    'plugins': command({
      gate: {
        'add': command({}),
        'remove': command({}),
        'search': command({
          handler: (arg) => {
            console.log(`search plugin: ${arg.name}`)
            return true
          },
          gate: {
            'name': positional1({}),
          },
        }),
      },
    }),
    // '--help': help({ alias: '-h' }),
  }
})
.exec()
