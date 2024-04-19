import { Parser } from './parser'

export type PositionalConfig = {
  description: string
  position: number
}

export class Positional {
  readonly name: string
  public config: PositionalConfig
  protected parser?: Parser

  constructor(name: string, config: Partial<PositionalConfig> = {}, parser?: Parser) {
    this.name = name
    this.config = {
      description: '',
      position: 0,
      ...config,
    }
    this.parser = parser
  }

  get value(): string {
    if (this.parser === undefined) {
      return ''
    }
    const positionals = this.parser.getPositionals()
    if (positionals.length > this.config.position) {
      return positionals[this.config.position]
    }
    return ''
  }

  get has(): boolean {
    if (this.parser === undefined) {
      return false
    }
    return this.parser.getPositionals().length > this.config.position
  }
}
