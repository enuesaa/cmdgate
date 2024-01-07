/**
 * @deprecated
 */
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

  get argv(): string[] {
    return structuredClone(this._argv)
  }

  get rawArgs(): string[] {
    return structuredClone(this._rawArgs)
  }

  get rawPositionals(): string[] {
    return structuredClone(this._rawPositionals)
  }

  get rawFlags(): Record<string, string[]> {
    return structuredClone(this._rawFlags)
  }

  get routes(): string[] {
    const list = []
    let lastValue = ''
    for (const value of structuredClone(this._rawPositionals)) {
      lastValue = `${lastValue}${value}`
      list.push(lastValue)
      lastValue = `${lastValue} `
    }
    return list.reverse()
  }

  setMatchedRoute(route: string) {
    this._matchedRoute = route
  }

  get positionals(): string[] {
    const list = structuredClone(this._rawPositionals)
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
