import { Argv } from './argv'

export type FlagConfig = {
  description: string
  alias: string | null
}

// TODO: mark value types: bool, string, string[]
export class Flag {
  readonly name: string
  public config: FlagConfig
  public argv: Argv = new Argv([])

  constructor(name: string, config: Partial<FlagConfig> = {}) {
    this.name = name
    this.config = {
      description: '',
      alias: null,
      ...config,
    }
  }

  get value(): string {
    if (!this.has) {
      return ''
    }

    const values = this.argv.find((i, value, prev) => prev === this.name)
    return values.length > 0 ? values[0] : ''
  }

  get has(): boolean {
    return this.argv.find((i, value) => value === this.name).length > 0
  }
}
