import { Command } from '@/fragment/command'
import { Prompt } from '@/prompt'
import { classifyArgs } from '@/util/classify-args'

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

  exec() {
    this.prompt = new Prompt()
    const args = classifyArgs(this.args ?? this.prompt.getArgs())
    const { resolved, command } = this.matcher(args.serials, this.config.gate)
    if (resolved) {
      command.execHandler({ options: args.options }, this.prompt)
    }
    this.prompt.close()
  }
}
