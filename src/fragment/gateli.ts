import { Command } from '@/fragment/command'
import { Option } from '@/fragment/option'
import { Prompt } from '@/prompt'
import { classify } from '@/util/classify'
import { matcher } from '@/util/matcher'
import { resoveStdinArgs } from '@/util/stdinArgs'
import { Handler, HandlerArg } from '@/handler'

export type GateliArg = {
  name: string
  description: string
  handler: Handler
  gate: {
    [key: string]: Command | Option
  }
}

export class Gateli {
  protected name: string
  protected description: string
  protected handler: Handler
  protected commands: Command[]
  protected options: Option[]
  protected prompt: Prompt

  constructor(arg: Partial<GateliArg>) {
    this.prompt = new Prompt()
    this.name = arg.name ?? ''
    this.description = arg.description ?? ''
    this.handler = arg.handler ?? ((arg: HandlerArg) => { console.log('default gateli handler'); return true })
    const { commands, options } = classify(arg.gate ?? {})
    this.commands = commands
    this.options = options
  }

  exec() {
    const args = this.prompt.getArgs()
    const stdinArgDict = resoveStdinArgs(args)
    if (this.commands.length > 0) {
      const {resolved, command, rest} = matcher(stdinArgDict.positionals, this.commands)
      if (resolved) {
        command.execHandler({positionals: rest, options: stdinArgDict.options})
        this.prompt.close()
        return;
      }
    }
    this.execHandler(stdinArgDict)
    this.prompt.close()
  }

  execHandler(arg: HandlerArg): boolean {
    return this.handler(arg)
  }

  isCliOption(value: string): boolean {
    return value.startsWith('-')
  }
}
