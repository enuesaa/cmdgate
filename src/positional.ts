import { Parser } from './parser'

export type PositionalConfig = {
  description: string
  required: boolean
}

export class Positional {
  protected _name: string
  public config: PositionalConfig
  protected _parser: Parser | null

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
    // const args = this._parser.getRawArgs()
    return ''
  }

  get has(): boolean {
    if (this._parser === null) {
      return false
    }
    // todo
    return false
  }

  bind(parser: Parser) {
    parser.hasFlag(this._name)
  }
}
