import { Option } from '@/fragment/option'
import { Command } from '@/fragment/command'
import { Prompt } from '@/prompt'

export type HelpOptionConfig = {
  alias: string
  message: string
}

export class HelpOption {
  name: string | null
  config: HelpOptionConfig
  alias: string | null
  message: string | null

  constructor(name: string, config: Partial<HelpOptionConfig>) {
    this.name = name
    this.config = { alias: null, message: '', ...config }
  }

  isMatch(name: string): boolean {
    return this.name === name || this.config.alias === name
  }

  setDefaultHelpMessage({
    commands,
    options,
    description,
    name,
  }: {
    commands: Command[]
    options: Option[]
    description: string
    name: string
  }): void {
    this.message = `${name}
${description}

commands:
${commands.map((v) => '  ' + v.route + '\n').join('')}
options:
${options.map((v) => '  ' + v.name + '\n').join('')}
`
  }

  execHandler(prompt: Prompt) {
    prompt.println(this.message ?? 'default help message')
  }
}
