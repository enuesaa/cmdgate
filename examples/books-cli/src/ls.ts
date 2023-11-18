import { createHandler } from '@enuesaa/cmdgate'
import { books } from './books'

export const lsHandler = createHandler()

const searchFlag = lsHandler.flag('--search', {
  description: 'search books with name prefix',
  required: false,
})

lsHandler.main(prompt => {
  const searchValue = searchFlag.has() ? searchFlag.value : null

  for (const book of books) {
    if (searchValue !== null && !book.name.startsWith(searchValue)) {
      continue
    }
    prompt.info(`${book.name}`)
  }

  prompt.exit(0)
})
