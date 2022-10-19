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
  args: string[] | null

  constructor(config: Partial<GateliConfig>) {
    this.config = { name: '', description: '', version: '', gate: [], ...config }
    this.prompt = null
    this.args = null
  }

  withArgs(args: string[]): Gateli {
    this.args = args
    return this
  }

  protected matcher(serials: string[], commands: Command[]): { resolved: boolean; command: Command | null } {
    const route = serials.join(' ')
    for (const command of commands) {
      if (command.isMatch(route)) {
        return { resolved: true, command: command }
      }
    }
    return { resolved: false, command: null }
  }

  classifyPassedArgs(args: string[]): { options: { [key: string]: string | true }; serials: string[] } {
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

  exec() {
    this.prompt = new Prompt()
    const passed = this.classifyPassedArgs(this.args ?? this.prompt.getArgs())
    const { resolved, command } = this.matcher(passed.serials, this.config.gate)
    if (resolved) {
      command.execHandler({ options: passed.options }, this.prompt, this)
    }
    this.prompt.close()
  }
}
