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
    const positionals = this.listPositionals()
    if (positionals.length > this.config.position) {
      return positionals[this.config.position]
    }
    return ''
  }

  get has(): boolean {
    return this.listPositionals().length > this.config.position
  }

  filterRouteMatchedArgs(): string[] {
    const matched = this.baseRoute.split(' ').filter((v) => v !== '')
    return getRawArgs(this.argv).slice(matched.length)
  }

  /**
   * positional matched below.
   * - aaa --flag flagvalue positional
   * - aaa positional --flag flagvalue
   */
  listPositionals(): string[] {
    const list: string[] = []

    /**
     * in the future,
     * these logic also should be look at the definition of flags.
     */
    let nextIsFlagValue: boolean = false
    for (const arg of this.filterRouteMatchedArgs()) {
      if (nextIsFlagValue) {
        nextIsFlagValue = false
        continue
      }
      if (arg.startsWith('-')) {
        nextIsFlagValue = true
        continue
      }
      list.push(arg)
    }

    return list
  }
}
