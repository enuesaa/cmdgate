export type ProcessArgDict = {
  positionals: string[]
  options: {
    [key: string]: string | null
  }
}

export const resoveStdinArgs = (stdinArgs: string[]): ProcessArgDict => {
  const dict: ProcessArgDict = { positionals: [], options: {} }

  let optionKey: string | null = null
  for (const word of stdinArgs) {
    if (word.startsWith('-')) {
      optionKey = word
      dict.options[optionKey] = null
    } else if (optionKey !== null) {
      dict.options[optionKey] = word
      optionKey = null
    } else {
      dict.positionals.push(word)
    }
  }

  return dict
}
