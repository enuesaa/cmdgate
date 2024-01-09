import { Parser } from './parser';

export type ArgumentConfig = {
  description: string;
  required: boolean;
}
export class Argument {
  protected _name: string
  protected _config: ArgumentConfig
  protected _parser: Parser|null

  constructor(name: string, config: Partial<ArgumentConfig> = {}) {
    this._name = name
    this._config = {
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