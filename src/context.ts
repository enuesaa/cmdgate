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

  get positionals(): string[] {
    const list = structuredClone(this._rawPositionals)
    for (const _ of this._matchedRoute.split(' ')) {
      list.shift()
    }

    return list
  }
}
