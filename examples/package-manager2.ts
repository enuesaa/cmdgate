import { cli, command, option, help, positional1 } from '../src/index'

const versionCmd = command({
  handler: ({ prompt }) => {
    prompt.println('version: 0.1.0')
  },
})

const initCmd = command({
  gate: {
    name: positional1()
  },
  handler: ({ args, prompt }) => {
    prompt.println(args)
  },
})

const addCmd = command({
  gate: {
    'name': positional1(),
    '--dev': option(),
  },
  handler: ({ args, prompt }) => {
    prompt.println(args)
  },
})

const removeCmd = command({
  gate: {
    name: positional1(),
  },
})

cli({
  name: 'package-manager2',
  description: 'package manager cli 2',
  gate: {
    'version': versionCmd,
    'init': initCmd,
    'add': addCmd,
    'remove': removeCmd,
    '--help': help({ alias: '-h' }),
  }
})
.exec()
