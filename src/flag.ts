import { Parser } from './parser'

export type FlagConfig = {
  description: string
  alias: string|null
  required: boolean
}
export class Flag {
  protected _name: string
  protected _config: FlagConfig
  protected _parser: Parser|null

  constructor(name: string, config: Partial<FlagConfig> = {}) {
    this._name = name
    this._config = {
      description: '',
      alias: null,
      required: false,
      ...config,
    }
    this._parser = null
  }

  get value(): string {
    if (this._parser === null) {
      return ''
    }
    return this._parser.getFlagValue(this._name)
  }

  get has(): boolean {
    if (this._parser === null) {
      return false
    }
    return this._parser.hasFlag(this._name)
  }

  bind(parser: Parser) {
    parser.hasFlag(this._name)
  }
}
