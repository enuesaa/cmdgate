import { Parser } from './parser'

export type PositionalConfig = {
  description: string
  position: number
}

export class Positional {
  readonly name: string
  public config: PositionalConfig
  public parser: Parser
  public baseRoute: string

  constructor(name: string, config: Partial<PositionalConfig> = {}, parser: Parser = new Parser()) {
    this.name = name
    this.config = {
      description: '',
      position: 0,
      ...config,
    }
    this.parser = parser
    this.baseRoute = ''
  }

  get value(): string {
    const positionals = this.parser.getPositionals(this.baseRoute)
    if (positionals.length > this.config.position) {
      return positionals[this.config.position]
    }
    return ''
  }

  get has(): boolean {
    return this.parser.getPositionals().length > this.config.position
  }
}
