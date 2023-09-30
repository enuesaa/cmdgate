import { createGate } from '../../../dist'

const versionGate = createGate()
versionGate.flag('--version', { alias: '-h', description: 'Print version information.' })

export const versionHandler = versionGate.handle((context, prompt) => {
  const { versionFlag } = versionGate.parse(context)
  if (versionFlag) {
    prompt.info(versionGate.generateHelpMessage())
    prompt.exit(0)
  }
})
