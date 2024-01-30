import { createCmd } from '@enuesaa/cmdgate'

export const addCmd = createCmd()

const nameArg = addCmd.positional('name')
const descriptionArg = addCmd.positional('description')

addCmd.handle(prompt => {
  if (!nameArg.has) {
    prompt.info('<name> is required')
    return;
  }
  if (!descriptionArg.has) {
    prompt.info('<description> is required')
    return;
  }
  prompt.info(`name: ${nameArg.value}`)
  prompt.info(`description: ${descriptionArg.value}`)

  // this command is mock
})
