import { Parser } from './parser'

export type PositionalConfig = {
  description: string
}

export class Positional {
  protected _name: string
  public config: PositionalConfig
  protected _parser: Parser | null
  protected _route?: string
  protected _position: number = 0

  constructor(name: string, config: Partial<PositionalConfig> = {}) {
    this._name = name
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
    if (positionals.length > this._position) {
      return positionals[this._position]
    }
    return ''
  }

  get has(): boolean {
    if (this._parser === null) {
      return false
    }
    return this._parser.getPositionals().length > this._position
  }

  bind(parser: Parser, position: number, route?: string) {
    this._parser = parser
    this._position = position
    this._route = route
  }
}
