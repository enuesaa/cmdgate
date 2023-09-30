const gate = createGate()
gate.flag('--message', { required: true })

export const rootCmd = gate.handle((context, prompt) => {
  const { messageFlag } = gate.parse(context)
  if (messageFlag) {
    prompt.info(messageFlag.generateHelpMessage())
    prompt.exit(0)
  }
})
