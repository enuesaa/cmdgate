import { gateli, command, option, positional1, helpOption, versionOption } from '../src/index'

gateli({
  name: 'package-manager',
  description: 'package manager cli',
  version: '0.1.0',
  gate: [
    command('plugin list', {
      handler: ({ prompt }) => {},
    }),
    command('plugin view', {
      param: {
        name: positional1({ required: true }),
      },
      handler: ({ prompt }) => {},
    }),
    command('plugin add', {
      param: {
        name: positional1({ required: true }),
        isDev: option('--dev', { alias: '-d' }),
      },
      handler: ({ prompt }) => {},
    }),
    command('plugin', {
      param: {
        help: helpOption('--help', { alias: '-h', global: true }),
      },
      handler: ({ prompt }) => {},
    }),

    command('', {
      param: {
        help: helpOption('--help', { alias: '-h' }),
        version: versionOption('--version', { alias: '-v' }),
      },
      handler: ({ prompt }) => {},
    }),
  ],
})
.exec()
