import { createGate } from '@enuesaa/cmdgate'

const versionGate = createGate()

const versionFlag = versionGate.flag('--version', {
  description: 'Print version information.',
  required: false,
})

export const versionHandler = versionGate.handle(prompt => {
  if (versionFlag.has) {
    prompt.info('books-cli version 0.0.1.')
    prompt.exit(0)
  }
})
