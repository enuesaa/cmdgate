import { getRawArgs } from './parseutil'

export type FlagConfig = {
  description: string
  alias: string | null
}

// TODO: mark value types: bool, string, string[]
export class Flag {
  readonly name: string
  public config: FlagConfig
  public argv: string[]

  constructor(name: string, config: Partial<FlagConfig> = {}, argv: string[]) {
    this.name = name
    this.config = {
      description: '',
      alias: null,
      ...config,
    }
    this.argv = argv
  }

  get value(): string {
    if (!this.has) {
      return ''
    }

    const args = getRawArgs(this.argv)
    let isNext: boolean = false
    for (const raw of args) {
      if (isNext) {
        return raw
      }
      if (raw === this.name) {
        isNext = true
      }
    }
    return ''
  }

  get has(): boolean {
    return this.argv.includes(this.name)
  }
}
