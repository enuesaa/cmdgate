import { Argv } from './argv'

export type PositionalConfig = {
  description: string
  position: number
}

export class Positional {
  readonly name: string
  public config: PositionalConfig
  public argv: Argv = new Argv([])
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

  /**
   * positional matched below.
   * - aaa --flag flagvalue positional
   * - aaa positional --flag flagvalue
   */
  listPositionals(): string[] {
    const routed = this.baseRoute.split(' ').filter((v) => v !== '')
    const values = this.argv.find((i, value, prev) => {
      if (i < routed.length) {
        return false
      }
      return !value.startsWith('-') && !prev.startsWith('-')
    })
    return values
  }
}
