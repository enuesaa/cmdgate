import { createGate } from '@enuesaa/cmdgate'
import { books } from './books'

const lsGate = createGate()
const searchFlag = lsGate.flag('--search', {
  alias: null,
  description: 'search books with name prefix',
  required: false,
})

export const lsHandler = lsGate.handle(prompt => {
  const searchValue = searchFlag.has() ? searchFlag.value : null

  for (const book of books) {
    if (searchValue !== null && !book.name.startsWith(searchValue)) {
      continue
    }
    prompt.info(`${book.name}`)
  }

  prompt.exit(0)
})
