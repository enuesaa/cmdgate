import { createCmd } from '@enuesaa/cmdgate'

export const addCmd = createCmd()

const nameArg = addCmd.positional('name', {
  required: true,
})
const descriptionArg = addCmd.positional('description', {
  required: true,
})

addCmd.handle(prompt => {
  prompt.info(`name: ${nameArg.value}`)
  prompt.info(`description: ${descriptionArg.value}`)

  // this command is mock
})
