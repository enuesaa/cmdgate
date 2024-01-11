import { createCmd } from '@enuesaa/cmdgate'
import { books } from './books'

export const viewCmd = createCmd()

const nameArg = viewCmd.positional('name', {
  required: true,
})
viewCmd.handle(prompt => {
  const bookname = nameArg.value
  const book = books.find(b => b.name === bookname)
  if (typeof book === 'undefined') {
    prompt.error(`book name ${bookname} not found.`)
    prompt.exit(1)
    return
  }

  prompt.info(`name: ${book.name}`)
  prompt.info(`summary: ${book.summary}`)
  prompt.info(`pageCount: ${book.pageCount}`)
  prompt.info(`published: ${book.published}`)
  prompt.exit(0)
})
