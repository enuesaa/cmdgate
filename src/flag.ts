import { Parser } from './parser'

export type FlagConfig = {
  description: string
  alias: string | null
}

// TODO: mark value types: bool, string, string[]
export class Flag {
  readonly name: string
  public config: FlagConfig
  protected parser?: Parser

  constructor(name: string, config: Partial<FlagConfig> = {}, parser?: Parser) {
    this.name = name
    this.config = {
      description: '',
      alias: null,
      ...config,
    }
    this.parser = parser
  }

  get value(): string {
    if (this.parser === undefined) {
      return ''
    }
    return this.parser.getFlagValue(this.name)
  }

  get has(): boolean {
    if (this.parser === undefined) {
      return false
    }
    return this.parser.hasFlag(this.name)
  }

  bind(parser: Parser) {
    this.parser = parser
  }
}
