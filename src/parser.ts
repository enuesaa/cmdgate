export class Parser {
  protected _argv: string[]

  constructor(argv: string[]) {
    this._argv = argv
  }

  getArgv(): string[] {
    return this._argv
  }

  getRawArgs(): string[] {
    const [_nodebin, _filename, ...rawArgs] = this._argv
    return rawArgs
  }

  hasFlag(name: string): boolean {
    return this._argv.includes(name)
  }
  
  getFlagValue(name: string): string {
    if (!this.hasFlag(name)) {
      return ''
    }

    let isNext: boolean = false
    for (const raw of this.getArgv()) {
      if (isNext) {
        return raw
      }
      if (raw === name) {
        isNext = true
      }
    }
    return ''
  }
}
