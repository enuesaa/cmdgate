export const getArgsFromArgv = (argv: string[]): string[] => {
  const [_nodebin, _filename, ...args] = argv
  return args
}

type Finder = (i: number, value: string, prev: string) => boolean
export const findArgsFromArgv = (argv: string[], finder: Finder): string[] => {
  const list: string[] = []

  const args = getArgsFromArgv(argv)
  let prev: string = ''
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (finder(i, arg, prev)) {
      list.push(arg)
    }
    prev = arg
  }

  return list
}

export const listMatchableRouteFromArgv = (argv: string[]): string[] => {
  const mayCommandArgs = findArgsFromArgv(argv, (i, value, prev) => !value.startsWith('-') && !prev.startsWith('-'))

  const list: string[] = []
  for (let i = 0; i < mayCommandArgs.length; i++) {
    list.push(mayCommandArgs.slice(0, i + 1).join(' '))
  }
  return list
}

/**
 * positional matched below.
 * - aaa --flag flagvalue positional
 * - aaa positional --flag flagvalue
 */
export const listPositionalsFromArgv = (argv: string[], baseRoute: string): string[] => {
  const routed = baseRoute.split(' ').filter((v) => v !== '')
  const values = findArgsFromArgv(argv, (i, value, prev) => {
    if (i < routed.length) {
      return false
    }
    return !value.startsWith('-') && !prev.startsWith('-')
  })

  return values
}
