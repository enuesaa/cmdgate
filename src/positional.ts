import { getRawArgs } from './parseutil'

export type PositionalConfig = {
  description: string
  position: number
}

export class Positional {
  readonly name: string
  public config: PositionalConfig
  public argv: string[] = []
  public baseRoute: string = ''

  constructor(name: string, config: Partial<PositionalConfig> = {}) {
    this.name = name
    this.config = {
      description: '',
      position: 0,
      ...config,
    }
  }

  get value(): string {
    const positionals = this.getPositionals(this.baseRoute)
    if (positionals.length > this.config.position) {
      return positionals[this.config.position]
    }
    return ''
  }

  get has(): boolean {
    return this.getPositionals(this.baseRoute).length > this.config.position
  }

  // TODO rename to something.
  private getArgs(baseRoute: string = ''): string[] {
    const rawargs = getRawArgs(this.argv)

    const baseRouteSplitted = baseRoute.split(' ').filter((v) => v !== '')
    return rawargs.slice(baseRouteSplitted.length)
  }

  // positional matched below.
  // - aaa --flag flagvalue positional
  // - aaa positional --flag flagvalue
  private getPositionals(baseRoute: string = ''): string[] {
    const list: string[] = []
    let nextIsFlagValue: boolean = false
    for (const arg of this.getArgs(baseRoute)) {
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
}
