import { createHandler } from '@enuesaa/cmdgate'
import { books } from './books'

export const lshandler = createHandler()
const searchFlag = lshandler.flag('--search', { description: 'search value', required: false })

lshandler.main(prompt => {
  const searchValue = searchFlag.has() ? searchFlag.getValue() : null

  for (const book of books) {
    if (searchValue !== null) {
      if (!book.name.startsWith(searchValue)) {
        continue;
      }
    }
    prompt.info(`${book.name}`)
  }
  prompt.exit(0)
})
