type ClassifyStdinArgsResult = {
  options: { [key: string]: string | true };
  serials: string[]
}
export const classifyArgs = (args: string[]): ClassifyStdinArgsResult => {
  const ret = { options: {}, serials: [] }

  let optionKey: string | null = null
  for (const word of args) {
    if (word.startsWith('-')) {
      optionKey = word
      ret.options[optionKey] = true
    } else if (optionKey !== null) {
      ret.options[optionKey] = word
      optionKey = null
    } else {
      ret.serials.push(word)
    }
  }

  return ret 
}