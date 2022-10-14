import { gateli, command, option, help, positional1 } from '../src/index'

gateli({
  name: 'package-manager',
  description: 'package manager cli',
  gate: {
    'version': command({
      handler: (handle) => {
        handle.prompt.write('version: 0.1.0')
      },
    }),

    'init': command({
      handler: (handle) => {
        handle.prompt.write(JSON.stringify(handle.arg))
      },
      gate: {
        'name': positional1()
      }
    }),

    'add': command({
      handler: (handle) => {
        handle.prompt.write(JSON.stringify(handle.arg))
      },
      gate: {
        'name': positional1(),
        '--dev': option(),
      }
    }),

    'remove': command({
      gate: {
        name: positional1(),
      },
    }),

    '--help': help({ alias: '-h' }),
  }
})
.exec()
