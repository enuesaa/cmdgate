import { Option } from '@/fragment/option'
import { Command } from '@/fragment/command'

export type HelpOptionConfig = {
  alias: string
  message: string
}

export class HelpOption {
  name: string | null
  alias: string | null
  message: string | null

  constructor(name: string, config: Partial<HelpOptionConfig>) {
    this.name = name
    this.alias = config.alias ?? null
    this.message = config.message ?? null
  }

  setDefaultHelpMessage({ commands, options, description, name }: {commands: Command[], options: Option[], description: string, name: string}): void {
    this.message = `${name}
${description}

commands:
${commands.map(v => '  ' + v.route + '\n').join('')}
options:
${options.map(v => '  ' + v.name + '\n').join('')}
`
  }

  exec() {
    console.log(this.message)
  }
}
