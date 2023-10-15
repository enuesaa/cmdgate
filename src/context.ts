export class Context {
  private _argv: string[] = []
  private _rawArgs: string[] = []
  private _rawPositionals: string[] = []
  private _rawFlags: Record<string, string[]> = {}
  private _matchedRoute: string = ''

  constructor(argv: string[]) {
    const [_nodebin, _filename, ...rawArgs] = argv

    this._argv = argv
    this._rawArgs = rawArgs
    this._parseRawArgs()
  }

  getArgv(): string[] {
    return this._argv
  }

  getRawArgs(): string[] {
    return this._rawArgs
  }

  getRawPositionals(): string[] {
    return this._rawPositionals
  }

  getRawFlags(): Record<string, string[]> {
    return this._rawFlags
  }

  getRoutes(): string[] {
    const list = []
    let lastValue = ''
    for (const value of this._rawPositionals) {
      lastValue = `${lastValue}${value}`
      list.push(lastValue)
      lastValue = `${lastValue} `
    }
    return list.reverse()
  }

  setMatchedRoute(route: string) {
    this._matchedRoute = route
  }

  getPositionals(): string[] {
    const list = this._rawPositionals
    for (const _ of this._matchedRoute.split(' ')) {
      list.shift()
    }

    return list
  }

  private _parseRawArgs() {
    let status: 'POSITIONAL'|'FLAGS' = 'POSITIONAL'
    let flagname = ''

    for (const value of this._rawArgs) {
      if (status === 'POSITIONAL') {
        if (value.startsWith('-')) {
          status = 'FLAGS'
          flagname = value
          this._rawFlags[flagname] = []
          continue
        }

        this._rawPositionals.push(value)
        continue
      }

      if (status === 'FLAGS') {
        if (value.startsWith('-')) {
          flagname = value
          this._rawFlags[flagname] = []
          continue
        }

        this._rawFlags[flagname].push(value)
      }
    }
  }
}
