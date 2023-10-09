import { createHandler } from '../../../dist'

export const mainHandler = createHandler()
const messageFlag = mainHandler.flag('--message', { required: true })

mainHandler.handle((context, prompt) => {
  if (messageFlag) {
    prompt.info(context.generateHelpMessage())
    prompt.exit(0)
  }
})
