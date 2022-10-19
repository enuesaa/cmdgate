import { Option } from '@/fragment/option'
import { Command } from '@/fragment/command'
import { Prompt } from '@/prompt'
import { Positional } from './positional'
import { Gateli } from '@/gateli'

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

  generateHelpMessage(options: Option[], positionals: Positional[], gateli: Gateli, route: string, description: string): string {
    const commands = gateli.config.gate
    const matchedCommands = commands.filter(v => v.route.startsWith(route))
    return `${route}
${description}

commands:
${matchedCommands.map(v => `  ${v.route}`).join('\n')}

options:
${options.map((v) => `  ${v.name}`).join('\n')}
`
  }

  execHandler(prompt: Prompt, def: { options: Option[], positionals: Positional[] }, gateli: Gateli, route: string, description: string) {
    const message = this.generateHelpMessage(def.options, def.positionals, gateli, route, description)
    prompt.println(message)
  }
}
