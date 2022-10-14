import { cli, command, option, help, positional1 } from '../src/index'

cli({
  name: 'package-manager',
  description: 'package manager cli',
  gate: {
    'version': command({
      handler: ({ prompt }) => {
        prompt.println('version: 0.1.0')
      },
    }),

    'init': command({
      gate: {
        'name': positional1()
      },
      handler: ({ args, prompt }) => {
        prompt.println(args)
      },
    }),

    'add': command({
      gate: {
        'name': positional1(),
        '--dev': option(),
      },
      handler: ({ args, prompt }) => {
        prompt.println(args)
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
