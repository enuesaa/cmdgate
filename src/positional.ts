import { Cmd } from './cmd'

export type PositionalConfig = {
  description: string
  position: number
}

export class Positional {
  readonly name: string
  public config: PositionalConfig
  protected cmd: Cmd

  constructor(name: string, config: Partial<PositionalConfig> = {}, cmd: Cmd) {
    this.name = name
    this.config = {
      description: '',
      position: 0,
      ...config,
    }
    this.cmd = cmd
  }

  get value(): string {
    if (this.cmd?.parser === undefined) {
      return ''
    }
    const positionals = this.cmd.parser.getPositionals()
    if (positionals.length > this.config.position) {
      return positionals[this.config.position]
    }
    return ''
  }

  get has(): boolean {
    if (this.cmd?.parser === undefined) {
      return false
    }
    return this.cmd.parser.getPositionals().length > this.config.position
  }
}
