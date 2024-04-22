import { Argv, getRawArgs } from './parseutil'

export type FlagConfig = {
  description: string
  alias: string | null
}

// TODO: mark value types: bool, string, string[]
export class Flag {
  readonly name: string
  public config: FlagConfig
  public argv: string[] = []

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

    const argv = new Argv(this.argv)
    const values = argv.find((i, value, prev) => prev === this.name)
    return values.length > 0 ? values[0] : ''
  }

  get has(): boolean {
    const argv = new Argv(this.argv)
    return argv.find((i, value) => value === this.name).length > 0
  }
}
