export class Context {
  readonly argv: string[] = []
  readonly args: string[] = []

  constructor(argv: string[]) {
    const [_nodebin, _filename, ...rawArgs] = argv

    this.argv = argv
    this.args = rawArgs
  }
}
