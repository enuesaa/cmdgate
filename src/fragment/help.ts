import { Option } from '@/fragment/option'
import { Command } from '@/fragment/command'

export type HelpArg = {
  alias: string
  message: string
}

export class Help {
  name: string | null
  alias: string | null
  message: string | null

  constructor(arg: Partial<HelpArg>) {
    this.name = null
    this.alias = arg.alias ?? null
    this.message = arg.message ?? null
    this._validateAlias()
  }

  setDefaultHelpMessage({ commands, options, description, name }: {commands: Command[], options: Option[], description: string, name: string}): void {
    this.message = `${name}
${description}

commands:
${commands.map(v => '  ' + v.name + '\n').join('')}
options:
${options.map(v => '  ' + v.name + '\n').join('')}
`
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
