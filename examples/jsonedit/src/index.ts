import { createCmd } from '@enuesaa/cmdgate'
import fs from 'node:fs'

export const cli = createCmd({
  description: 'jsonedit',
})

const helpFlag = cli.flag('--help', {
  alias: '-h',
  description: 'Print help message.',
})
const versionFlag = cli.flag('--version', {
  description: 'Print version information.',
})

const filename = cli.positional('filename', {
  description: 'json file name to edit.',
})

const path = cli.flag('--path', {
  description: 'edit path.',
})
const value = cli.flag('--value', {
  description: 'new value',
})

cli.handle(prompt => {
  if (helpFlag.has) {
    prompt.info(cli.getHelpMessage())
    prompt.exit(0)
  }

  if (versionFlag.has) {
    prompt.info('version 0.0.1')
    prompt.exit(0)
  }

  if (!filename.has) {
    prompt.error('filename is required.')
    prompt.exit(1)
  }

  if (!path.has || !value.has) {
    prompt.error('flag --path and --value are required.')
    prompt.exit(1)
  }

  const jsonfile = fs.readFileSync(filename.value, {encoding: 'utf-8'})
  const data = JSON.parse(jsonfile)

  if (data.hasOwnProperty(path.value)) {
    data[path.value] = value.value
  }

  prompt.info(JSON.stringify(data))
})
