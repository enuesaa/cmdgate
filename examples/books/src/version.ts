import { createHandler } from '../../../dist'

export const versionHandler = createHandler()
const versionFlag = versionHandler.flag('--version', { alias: '-v', description: 'Print version information.', required: false })

versionHandler.handle((context, prompt) => {
  if (versionFlag.has()) {
    prompt.info('version flag passed.')
    prompt.exit(0)
  }
})
