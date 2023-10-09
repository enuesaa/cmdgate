import { createGate } from '../../../dist'

const gate = createGate()
gate.flag('--message', { required: true })

export const mainHandler = gate.handle((context, prompt) => {
  const { messageFlag } = gate.parse(context)
  if (messageFlag) {
    prompt.info(messageFlag.generateHelpMessage())
    prompt.exit(0)
  }
})
