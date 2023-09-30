import { createGate } from '../../../dist'

const helpGate = createGate()
helpGate.flag('--help', { alias: '-h', description: 'Print help message.' })

export const helpHandler = helpGate.handle((context, prompt) => {
  const { helpFlag } = helpGate.parse(context)
  if (helpFlag) {
    prompt.info(helpGate.generateHelpMessage())
    prompt.exit(0)
  }
})
