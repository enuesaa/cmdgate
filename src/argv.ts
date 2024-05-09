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
