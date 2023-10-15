import { createHandler } from '../../../dist'

export const mainHandler = createHandler()
const messageFlag = mainHandler.flag('--message', { description: '', required: true })

mainHandler.main((context, prompt) => {
  if (messageFlag.has()) {
    prompt.info(`message flag passed ${messageFlag.getValue()}`)
    prompt.exit(0)
  }
})
