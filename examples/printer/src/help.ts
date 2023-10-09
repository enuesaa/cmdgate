import { createHandler } from '../../../dist'

export const helpHandler = createHandler()

const helpFlag = helpHandler.flag('--help', { alias: '-h', description: 'Print help message.' })

helpHandler.handle((context, prompt) => {
  if (helpFlag.has()) {
    prompt.info(context.generateHelpMessage())
    prompt.exit(0)
  }
})
