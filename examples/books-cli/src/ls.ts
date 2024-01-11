import { createCmd } from '@enuesaa/cmdgate'
import { books } from './books'

export const lsCmd = createCmd()

const searchFlag = lsCmd.flag('--search', {
  description: 'search books with name prefix',
  required: false,
})
lsCmd.handle(prompt => {
  const searchValue = searchFlag.has ? searchFlag.value : null

  for (const book of books) {
    if (searchValue !== null && !book.name.startsWith(searchValue)) {
      continue
    }
    prompt.info(`${book.name}`)
  }

  prompt.exit(0)
})
