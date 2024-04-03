import { Parser } from './parser'

export type PositionalConfig = {
  description: string
}

export class Positional {
  readonly name: string
  public config: PositionalConfig
  public position: number = 0
  protected parser: Parser | null
  protected route?: string

  constructor(name: string, config: Partial<PositionalConfig> = {}) {
    this.name = name
    this.config = {
      description: '',
      ...config,
    }
    this.parser = null
  }

  get value(): string {
    if (this.parser === null) {
      return ''
    }
    const positionals = this.parser.getPositionals()
    if (positionals.length > this.position) {
      return positionals[this.position]
    }
    return ''
  }

  get has(): boolean {
    if (this.parser === null) {
      return false
    }
    return this.parser.getPositionals().length > this.position
  }

  bind(parser: Parser, position: number, route?: string) {
    this.parser = parser
    this.position = position
    this.route = route
  }
}
