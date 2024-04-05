import { createCmd } from '@enuesaa/cmdgate'

export const addCmd = createCmd({
  description: 'create new book',
})

const nameArg = addCmd.positional('name')
const descriptionArg = addCmd.positional('description')

addCmd.handle(prompt => {
  if (!nameArg.has) {
    prompt.info('<name> is required')
    return 1
  }
  if (!descriptionArg.has) {
    prompt.info('<description> is required')
    return 1
  }
  prompt.info(`Note: this command is mock.`)
  prompt.info('')
  prompt.info(`name: ${nameArg.value}`)
  prompt.info(`description: ${descriptionArg.value}`)
})
