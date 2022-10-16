import { gateli, command, option, positional1, helpOption, versionOption } from '../src/index'

const pluginListCmd = command('plugin list', {
  handler: ({ prompt }) => {},
})

const pluginViewCmd = command('plugin view', {
  param: {
    name: positional1({ required: true }),
  },
  handler: ({ prompt }) => {},
})

const pluginAddCmd = command('plugin add', {
  param: {
    name: positional1({ required: true }),
    isDev: option('--dev', { alias: '-d' }),
  },
  handler: ({ prompt }) => {},
})

const pluginCmd = command('plugin', {
  param: {
    help: helpOption('--help', { alias: '-h', global: true }),
  },
  handler: ({ prompt }) => {},
})

const rootCmd = command('', {
  param: {
    help: helpOption('--help', { alias: '-h' }),
    version: versionOption('--version', { alias: '-v' }),
  },
  handler: ({ prompt }) => {},
})

gateli({
  name: 'package-manager2',
  description: 'package manager 2 cli',
  version: '0.1.0',
  gate: [
    pluginListCmd,
    pluginViewCmd,
    pluginAddCmd,
    pluginCmd,
    rootCmd,
  ],
})
.exec()
