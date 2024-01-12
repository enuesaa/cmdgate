import { Parser } from './parser'

export type PositionalConfig = {
  description: string
  required: boolean
}

export class Positional {
  protected _name: string
  public config: PositionalConfig
  protected _parser: Parser | null
  protected _route?: string

  constructor(name: string, config: Partial<PositionalConfig> = {}) {
    this._name = name
    this.config = {
      description: '',
      required: false,
      ...config,
    }
    this._parser = null
  }

  get value(): string {
    if (this._parser === null) {
      return ''
    }
    // todo
    const positionals = this._parser.getPositionals()
    return positionals[0]
  }

  get has(): boolean {
    if (this._parser === null) {
      return false
    }
    // todo
    return this._parser.getPositionals().length > 0
  }

  bind(parser: Parser, route?: string) {
    this._parser = parser
    this._route = route
  }
}
