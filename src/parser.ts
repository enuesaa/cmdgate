export class Parser {
  public argv: string[]
  public baseRoute: string

  constructor(baseRoute: string = '') {
    this.argv = []
    // TODO: remove this 
    this.baseRoute = baseRoute
  }

  getRawArgs(): string[] {
    const [_nodebin, _filename, ...rawArgs] = this.argv
    return rawArgs
  }

  hasFlag(name: string): boolean {
    return this.argv.includes(name)
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

  // TODO rename to something.
  getArgs(): string[] {
    const rawargs = this.getRawArgs()

    const baseRouteSplitted = this.baseRoute.split(' ').filter((v) => v !== '')
    return rawargs.slice(baseRouteSplitted.length)
  }

  // positional matched below.
  // - aaa --flag flagvalue positional
  // - aaa positional --flag flagvalue
  getPositionals(): string[] {
    const list: string[] = []
    let nextIsFlagValue: boolean = false
    for (const arg of this.getArgs()) {
      if (arg.startsWith('-')) {
        nextIsFlagValue = true
        continue
      }
      if (nextIsFlagValue) {
        nextIsFlagValue = false
        continue
      }
      list.push(arg)
    }
    return list
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

    return list.map((v) => v.join(' '))
  }
}
