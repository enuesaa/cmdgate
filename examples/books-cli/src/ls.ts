import { createCmd } from '@enuesaa/cmdgate'
import { books } from './data'

export const lsCmd = createCmd()

const searchFlag = lsCmd.flag('--search', {
  description: 'search books with name prefix',
  required: false,
})
lsCmd.handle(prompt => {
  if (searchFlag.has) {
    for (const book of books) {
      if (!book.name.startsWith(searchFlag.value)) {
        continue
      }
      prompt.info(`${book.name}`)
    }
    return
  }

  for (const book of books) {
    prompt.info(`${book.name}`)
  }
})
