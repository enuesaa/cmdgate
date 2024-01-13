import { Parser } from './parser'

export type FlagConfig = {
  description: string
  alias: string | null
  required: boolean
}

export class Flag {
  protected _name: string
  public config: FlagConfig
  protected _parser?: Parser

  constructor(name: string, config: Partial<FlagConfig> = {}) {
    this._name = name
    this.config = {
      description: '',
      alias: null,
      required: false,
      ...config,
    }
  }

  get value(): string {
    if (typeof this._parser === 'undefined') {
      return ''
    }
    return this._parser.getFlagValue(this._name)
  }

  get has(): boolean {
    if (typeof this._parser === 'undefined') {
      return false
    }
    return this._parser.hasFlag(this._name)
  }

  bind(parser: Parser) {
    this._parser = parser
  }
}
