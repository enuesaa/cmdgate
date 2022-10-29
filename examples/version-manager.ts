import { gateli, command, option, positional1, helpOption, versionOption } from '../src/index'

/**
 * nvmやpyenvなど、いわゆるanyenv系のツールを想定
 */

gateli({
  name: 'version-manager',
  description: 'version manager cli',
  version: '0.1.0',
  gate: [
    command('ls-remote', {
      handler: ({ prompt }) => {
        prompt.println('command executed: ls-remote')
      }
    }),
    command('ls', {
      handler: ({ prompt }) => {
        prompt.println('command executed: ls')
      }
    }),
    command('install', {
      param: {
        version: positional1({ required: true }),
      },
      handler: ({ args, prompt }) => {
        prompt.println('command executed: install')
        prompt.println(`install version: ${args.version}`)
      }
    }),
    command('remove', {
      param: {
        version: positional1({ required: true }),
      },
      handler: ({ args, prompt }) => {
        prompt.println('command executed: remove')
        prompt.println(`remove version: ${args.version}`)
      }
    }),

    command('', {
      param: {
        version: versionOption('--version'),
        help: helpOption('--help'),
      },
    }),
  ],
})
.exec()
