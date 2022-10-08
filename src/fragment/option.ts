import process from 'node:process'

export type OptionArg = {
  description: string
  alias: string
  required: boolean
}

export class Option {
  name: string | null
  description: string
  alias: string | null
  required: boolean

  constructor(arg: Partial<OptionArg>) {
    this.name = null
    this.description = arg.description ?? ''
    this.alias = arg.alias ?? null
    this.required = arg.required ?? false
    this._validateAlias()
  }

  _validateAlias() {
    if (this.alias !== null && !this.alias.startsWith('-')) {
      console.error(`invalid alias name: ${this.alias}. alias name should be start with "-" like "-v"`)
      process.exit(1)
    }
  }

  bindName(name: string): Option {
    this.name = name
    return this
  }
}
