import { Command } from '@/fragment/command'
import { Prompt } from '@/prompt'
import { matcher } from '@/util/matcher'
import { resoveStdinArgs } from '@/util/processArgs'

export type GateliConfig = {
  name: string
  description: string
  version: string
  gate: Command[]
}

export class Gateli {
  name: string
  description: string
  version: string
  gate: Command[]
  prompt: Prompt

  constructor(config: Partial<GateliConfig>) {
    this.name = config.name ?? ''
    this.description = config.description ?? ''
    this.version = config.version ?? ''
    this.gate = config.gate ?? []
    this.prompt = new Prompt()
  }

  exec(args: string[] = null) {
    if (args === null) {
      args = this.prompt.getArgs()
    }
    const stdinArgDict = resoveStdinArgs(args)
    if (this.gate.length > 0) {
      const { resolved, command } = matcher(stdinArgDict.positionals, this.gate)
      if (resolved) {
        command.execHandler({ options: stdinArgDict.options }, this.prompt)
      }
    }
    this.prompt.close()
  }
}
