import { createGate } from '@enuesaa/cmdgate'

const helpGate = createGate()

const helpFlag = helpGate.flag('--help', {
  alias: '-h',
  description: 'Print help message.',
  required: false,
})

export const helpHandler = helpGate.handle(prompt => {
  if (helpFlag.has()) {
    prompt.info('help flag passed.')
    prompt.exit(0)
  }
})
