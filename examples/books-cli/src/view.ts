import { createGate } from '@enuesaa/cmdgate'
import { books } from './books'

const viewGate = createGate()

const nameArg = viewGate.positional('name', {
  required: true,
})

export const viewHandler = viewGate.handle(prompt => {
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
