import { createHandler } from '../../../dist'

export const mainHandler = createHandler()
const messageFlag = mainHandler.flag('--message', { alias: '', description: '', required: true })

mainHandler.handle((context, prompt) => {
  if (messageFlag.has()) {
    prompt.info('message flag passed')
    prompt.exit(0)
  }
})
