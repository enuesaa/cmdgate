export class Argv {
  public argv: string[] = []

  constructor(argv: string[]) {
    this.argv = argv
  }

  get args(): string[] {
    const [_nodebin, _filename, ...args] = this.argv
    return args
  }

  find(fn: (i: number, value: string, prev: string) => boolean): string[] {
    const list: string[] = []

    let prev: string = ''
    for (let i = 0; i < this.args.length; i++) {
      const arg = this.args[i]
      if (fn(i, arg, prev)) {
        list.push(arg)
      }
      prev = arg
    }

    return list
  }
}
