import { Parser } from './parser'

export type FlagConfig = {
  description: string
  alias: string | null
}

// TODO: mark value types: bool, string, string[]
export class Flag {
  readonly name: string
  public config: FlagConfig
  public parser: Parser

  constructor(name: string, config: Partial<FlagConfig> = {}, parser: Parser = new Parser()) {
    this.name = name
    this.config = {
      description: '',
      alias: null,
      ...config,
    }
    this.parser = parser
  }

  get value(): string {
    return this.parser.getFlagValue(this.name)
  }

  get has(): boolean {
    return this.parser.hasFlag(this.name)
  }
}
