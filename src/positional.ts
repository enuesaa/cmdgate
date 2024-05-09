import { listPositionalsFromArgv } from './argv'

export type PositionalConfig = {
  description: string
  position: number
}

export class Positional {
  readonly name: string
  public config: PositionalConfig
  protected argv: string[] = []
  protected baseRoute: string = ''

  constructor(name: string, config: Partial<PositionalConfig> = {}) {
    this.name = name
    this.config = {
      description: '',
      position: 0,
      ...config,
    }
  }

  get value(): string {
    const positionals = listPositionalsFromArgv(this.argv, this.baseRoute)
    if (positionals.length > this.config.position) {
      return positionals[this.config.position]
    }
    return ''
  }

  get has(): boolean {
    const positionals = listPositionalsFromArgv(this.argv, this.baseRoute)
    return positionals.length > this.config.position
  }

  bind(argv: string[], baseRoute: string = '') {
    this.argv = argv
    this.baseRoute = baseRoute
  }
}
