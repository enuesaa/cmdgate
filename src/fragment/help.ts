export type HelpArg = {
  alias: string
  message: string
}

export class Help {
  name: string | null
  alias: string | null
  message: string

  constructor(arg: Partial<HelpArg>) {
    this.name = null
    this.alias = arg.alias ?? null
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

  // isMatch(word: string): boolean {
  //   return this.name === word || (this.alias !== null && this.alias === word)
  // }

  exec(): boolean {
    console.log(this.message)
    return true
  }
}
