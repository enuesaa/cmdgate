import { createHandler } from '@enuesaa/cmdgate'
import { books } from './books'

export const viewHandler = createHandler()

const nameArg = viewHandler.argument('name', {
  required: true,
})

viewHandler.main(prompt => {
  const bookname = nameArg.getValue()
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
