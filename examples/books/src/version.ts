import { createHandler } from '../../../dist'

export const versionHandler = createHandler()
const versionFlag = versionHandler.flag('--version', { description: 'Print version information.', required: false })

versionHandler.main(prompt => {
  if (versionFlag.has()) {
    prompt.info('version flag passed.')
    prompt.exit(0)
  }
})
