import process from 'node:process'

export type OptionArg = {
  description: string
  alias: string
  required: boolean
}

export class Option {
  protected name: string | null
  protected description: string
  protected alias: string | null
  protected required: boolean

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

  isMatch(value: string): boolean {
    return this.name === value
  }
}

/**
 * @deprecated
 */
export const searchFromOptions = (options: Option[], value: string): false | Option => {
  for (const option of options) {
    if (option.isMatch(value)) {
      return option
    }
  }
  return false
}
