import { gateli } from '../src/a'
import { cli, command, option, help, positional1, scope } from '../src/b'

cli({
  name: 'package-manager',
  description: 'package manager cli',
  gate: {

    'plugin': scope({
      description: 'plugin',
      gate: {
        'list': command({
          handler: ({ prompt }) => {

          },
        }),
        'view': command({
          handler: ({ prompt }) => {

          },
        }),
        'add': command({
          param: {
            'name': positional1({ required: true }),
            '--dev': option()
          },
          handler: ({ prompt }) => {

          },
        }),
        '--help': help({ alias: '-h' }),
      }
    }),

    'version': command({
      handler: ({ prompt }) => {
        prompt.println('version: 0.1.0')
      },
    }),

    '--help': help(),
  },
})
