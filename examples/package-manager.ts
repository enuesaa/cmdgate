import { cli, command, option, help, positional1 } from '../src/index'

cli({
  name: 'package-manager',
  description: 'package manager cli',
  gate: {
    'version': command({
      handler: (handle) => {
        handle.prompt.write('version: 0.1.0')
      },
    }),

    'init': command({
      gate: {
        'name': positional1()
      },
      handler: (handle) => {
        handle.prompt.write(JSON.stringify(handle.args))
      },
    }),

    'add': command({
      gate: {
        'name': positional1(),
        '--dev': option(),
      },
      handler: (handle) => {
        handle.prompt.write(JSON.stringify(handle.args))
      },
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
