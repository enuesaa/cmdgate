import { createHandler } from '@enuesaa/cmdgate'

export const viewhandler = createHandler()
const namearg = viewhandler.argument('name', { required: true })

viewhandler.main(prompt => {
  prompt.info(`lookup: ${namearg.getValue()}`)
})
