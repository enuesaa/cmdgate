import { Parser } from './parser'

export type PositionalConfig = {
  description: string
}

export class Positional {
  readonly name: string
  public config: PositionalConfig
  public position: number = 0
  protected _parser: Parser | null
  protected _route?: string

  constructor(name: string, config: Partial<PositionalConfig> = {}) {
    this.name = name
    this.config = {
      description: '',
      ...config,
    }
    this._parser = null
  }

  get value(): string {
    if (this._parser === null) {
      return ''
    }
    const positionals = this._parser.getPositionals()
    if (positionals.length > this.position) {
      return positionals[this.position]
    }
    return ''
  }

  get has(): boolean {
    if (this._parser === null) {
      return false
    }
    return this._parser.getPositionals().length > this.position
  }

  bind(parser: Parser, position: number, route?: string) {
    this._parser = parser
    this.position = position
    this._route = route
  }
}
