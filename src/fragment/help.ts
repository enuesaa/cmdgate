export type HelpArg = {
  alias: string
  message: string
}

export class Help {
  protected name: string | null
  protected alias: string | null
  protected message: string

  constructor(arg: Partial<HelpArg>) {
    this.name = null
    this.alias = arg.alias
    this.message = arg.message ?? 'help message'
    this._validateAlias()
  }

  _validateAlias() {
    if (this.alias !== null && !this.alias.startsWith('-')) {
      console.error(`invalid alias name: ${this.alias}. alias name should be start with "-" like "-v"`)
      process.exit(1)
    }
  }

  bindName(name: string): Help {
    this.name = name
    return this
  }
}
