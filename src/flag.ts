import { Cmd } from './cmd'

export type FlagConfig = {
  description: string
  alias: string | null
}

// TODO: mark value types: bool, string, string[]
export class Flag {
  readonly name: string
  public config: FlagConfig
  protected cmd: Cmd

  constructor(name: string, config: Partial<FlagConfig> = {}, cmd: Cmd) {
    this.name = name
    this.config = {
      description: '',
      alias: null,
      ...config,
    }
    this.cmd = cmd
  }

  get value(): string {
    if (this.cmd?.parser === undefined) {
      return ''
    }
    return this.cmd.parser.getFlagValue(this.name)
  }

  get has(): boolean {
    if (this.cmd?.parser === undefined) {
      return false
    }
    return this.cmd.parser.hasFlag(this.name)
  }

  /**
   * @todo cmd と flag は相互依存してしまっている. 一方方向にしたい
   */
  bind(cmd: Cmd) {
    this.cmd = cmd
  }
}
