import { createCmd } from '@enuesaa/cmdgate'
import { books } from './data'

export const viewCmd = createCmd({
  description: 'lookup the book',
})

const nameArg = viewCmd.positional('name')

viewCmd.handle(prompt => {
  if (!nameArg.has) {
    prompt.info('<name> is required')
    return 1
  }

  const bookname = nameArg.value
  const book = books.find(b => b.name === bookname)
  if (typeof book === 'undefined') {
    prompt.error(`book name ${bookname} not found.`)
    return 1
  }

  prompt.info(`name: ${book.name}`)
  prompt.info(`summary: ${book.summary}`)
  prompt.info(`pageCount: ${book.pageCount}`)
  prompt.info(`published: ${book.published}`)
})
