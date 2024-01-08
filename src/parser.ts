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
    for (const raw of this.getRawArgs()) {
      if (isNext) {
        return raw
      }
      if (raw === name) {
        isNext = true
      }
    }
    return ''
  }

  listMatchableRoutes(): string[] {
    const list: string[][] = []

    let isNextFlagValue: boolean = false
    for (const raw of this.getRawArgs()) {
      const lastRoute: string[] = list.length === 0 ? [] : structuredClone(list[list.length - 1])
      if (isNextFlagValue) {
        isNextFlagValue = false
        continue
      }

      if (raw.startsWith('-')) {
        isNextFlagValue = true
        continue
      }

      lastRoute.push(raw)
      list.push(lastRoute)
    }

    return list.map(v => v.join(' '))
  }
}
