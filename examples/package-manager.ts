import { gateli, command, option, help, positional1 } from '../src/index'
import { Prompt } from '../src/prompt'

gateli({
  name: 'package-manager',
  description: 'package-manager cli',
  gate: {
    'version': command({
      handler: (arg, prompt: Prompt) => {
        prompt.write('version: 0.1.0')
      },
    }),

    'init': command({
      handler: (arg, prompt: Prompt) => {
        prompt.write(JSON.stringify(arg))
      },
      gate: {
        'name': positional1({})
      }
    }),

    'add': command({
      handler: (arg, prompt: Prompt) => {
        prompt.write(JSON.stringify(arg))
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
          handler: (arg, prompt: Prompt) => {
            prompt.write(`search plugin: ${arg.name}`)
          },
          gate: {
            'name': positional1({}),
          },
        }),
      },
    }),
    '--help': help({ alias: '-h' }),
  }
})
.exec()
