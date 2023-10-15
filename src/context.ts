export class Context {
  private _argv: string[] = []
  private _args: string[] = []

  constructor(argv: string[]) {
    const [_nodebin, _filename, ...rawArgs] = argv

    this._argv = argv
    this._args = rawArgs
  }

  getArgv(): string[] {
    return this._argv
  }

  getArgs() : string[] {
    return this._args
  }
}
