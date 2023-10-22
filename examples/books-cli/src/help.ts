import { createHandler } from '@enuesaa/cmdgate'

export const helpHandler = createHandler()

const helpFlag = helpHandler.flag('--help', {
  alias: '-h',
  description: 'Print help message.',
  required: false,
})

helpHandler.main(prompt => {
  if (helpFlag.has()) {
    prompt.info('help flag passed.')
    prompt.exit(0)
  }
})
