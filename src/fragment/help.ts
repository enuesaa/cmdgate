import { generateHelpMessage } from "@/util/help_message"

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
    this.message = arg.message ?? generateHelpMessage()
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

  exec(): boolean {
    console.log(this.message)
    return true
  }
}
