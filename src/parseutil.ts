export const getRawArgs = (argv: string[]): string[] => {
  const [_nodebin, _filename, ...rawArgs] = argv
  return rawArgs
}
