export class Context {
  private _argv: string[] = []
  private _rawArgs: string[] = []
  private _positional: string[] = []
  private _flags: Record<string, string[]> = {}

  constructor(argv: string[]) {
    const [_nodebin, _filename, ...rawArgs] = argv

    this._argv = argv
    this._rawArgs = rawArgs
    this._parseRawArgs()
  }

  getRawArgs(): string[] {
    return this._rawArgs
  }

  private _parseRawArgs() {
    let status: 'POSITIONAL'|'FLAGS' = 'POSITIONAL'
    let flagname = ''

    for (const value of this._rawArgs) {
      if (status === 'POSITIONAL') {
        if (value.startsWith('-')) {
          status = 'FLAGS'
          flagname = value
          this._flags[flagname] = []
          continue
        }

        this._positional.push(value)
        continue
      }

      if (status === 'FLAGS') {
        if (value.startsWith('-')) {
          flagname = value
          this._flags[flagname] = []
          continue
        }

        this._flags[flagname].push(value)
      }
    }
  }
}
