import { Gateli } from '@/gateli'
import { Command } from '@/fragment/command'

export type HelpOptionConfig = {
  alias: string
  message: string
}

export class HelpOption {
  name: string
  config: HelpOptionConfig

  constructor(name: string, config: Partial<HelpOptionConfig>) {
    this.name = name
    this.config = { alias: null, message: '', ...config }
  }

  isMatch(name: string): boolean {
    return this.name === name || this.config.alias === name
  }

  generateDefaultMessage(gateli: Gateli, triggered: Command): string {
    const route = triggered.route
    const description = triggered.config.description
    const { options, positionals } = triggered.classifyParam()
    const commands = gateli.config.gate
    const matchedCommands = commands.filter((v) => v.route.startsWith(route))

    return (
      `${route}\n`
      + `${description}\n`
      + '\n'
      + 'commands:\n'
      + matchedCommands.map((v) => `  ${v.route}`).join('\n')
      + '\n'
      + 'options:\n'
      + options.map((v) => `  ${v.name}`).join('\n')
      + '\n'
    )
  }

  exec(gateli: Gateli, triggered: Command) {
    const message = this.generateDefaultMessage(gateli, triggered)
    gateli.prompt.println(message)
  }
}
