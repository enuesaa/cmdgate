import { findArgsFromArgv } from './argv'

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
    if (this._positionals.length > this.config.position) {
      return this._positionals[this.config.position]
    }
    return ''
  }

  get has(): boolean {
    return this._positionals.length > this.config.position
  }

  /**
   * positional matched below.
   * - aaa --flag flagvalue positional
   * - aaa positional --flag flagvalue
   */
  get _positionals(): string[] {
    const routed = this.baseRoute.split(' ').filter((v) => v !== '')
    const values = findArgsFromArgv(this.argv, (i, value, prev) => {
      if (i < routed.length) {
        return false
      }
      return !value.startsWith('-') && !prev.startsWith('-')
    })
    return values
  }
}
