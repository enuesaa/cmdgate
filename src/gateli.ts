import { Command } from '@/fragment/command'
import { Prompt } from '@/prompt'

export type GateliConfig = {
  name: string
  description: string
  version: string
  gate: Command[]
}

export class Gateli {
  config: GateliConfig
  prompt: Prompt | null
  passed: string[] | null

  constructor(config: Partial<GateliConfig>) {
    this.config = { name: '', description: '', version: '', gate: [], ...config }
    this.prompt = null
    this.passed = null
  }

  pass(passed: string[]): Gateli {
    this.passed = passed
    return this
  }

  classifyPassedArgs(): { options: { [key: string]: string | true }; serials: string[] } {
    const args = this.passed ?? this.prompt.getArgs()
    const ret = { options: {}, serials: [] }
    let optionKey: string | null = null
    for (const word of args) {
      if (word.startsWith('-')) {
        optionKey = word
        ret.options[optionKey] = true
      } else if (optionKey !== null) {
        ret.options[optionKey] = word
        optionKey = null
      } else {
        ret.serials.push(word)
      }
    }
    return ret
  }

  matcher(commands: Command[], serials: string[]): { resolved: boolean; command: Command | null } {
    const route = serials.join(' ')
    for (const command of commands) {
      if (command.isMatch(route)) {
        return { resolved: true, command: command }
      }
    }
    return { resolved: false, command: null }
  }

  exec() {
    this.prompt = new Prompt()
    const { serials, options } = this.classifyPassedArgs()
    const { resolved, command } = this.matcher(this.config.gate, serials)
    if (resolved) {
      const commandRoute = command.route
      const positionals = serials.join(' ').replace(commandRoute, '').split(' ') // @todo fix replace
      command.execHandler({ options, positionals, gateli: this })
    } else {
      this.prompt.error('not found')
    }
    this.prompt.close()
  }
}
