import { createHandler } from '@enuesaa/cmdgate'
import { books } from './books'

export const viewhandler = createHandler()
const namearg = viewhandler.argument('name', { required: true })

viewhandler.main(prompt => {
  const bookname = namearg.getValue()
  const book = books.find((b, i) => b.name === bookname)
  if (typeof book === 'undefined') {
    return prompt.exit(1)
  }

  prompt.info(`name: ${book.name}`)
  prompt.info(`summary: ${book.summary}`)
  prompt.info(`pageCount: ${book.pageCount}`)
  prompt.info(`published: ${book.published}`)
  prompt.exit(0)
})
