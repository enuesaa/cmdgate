import { Command } from '@/fragment/command'
import { Option } from '@/fragment/option'
import { Prompt } from '@/prompt'
import { classify } from '@/util/classify'
import { matcher } from '@/util/matcher'
import { resoveStdinArgs } from '@/util/stdinArgs'
import { Handler, HandlerArg, resolveHandlerArg } from '@/handler'
import { Positional } from '@/fragment/positional'
import { Help } from '@/fragment/help'

export type GateliArg = {
  name: string
  description: string
  handler: Handler
  gate: {
    [key: string]: Command | Option | Positional | Help
  }
}

export class Gateli {
  name: string
  description: string
  handler: Handler
  commands: Command[]
  options: Option[]
  positionals: Positional[]
  prompt: Prompt
  help: Help

  constructor(arg: Partial<GateliArg>) {
    this.prompt = new Prompt()
    this.name = arg.name ?? ''
    this.description = arg.description ?? ''
    this.handler =
      arg.handler ??
      ((arg: HandlerArg) => {
        console.log('default gateli handler')
        return true
      })
    const { commands, options, positionals, help } = classify(arg.gate ?? {})
    this.commands = commands
    this.options = options
    this.positionals = positionals
    this.help = help ?? new Help({})
  }

  exec() {
    const args = this.prompt.getArgs()
    const stdinArgDict = resoveStdinArgs(args)
    if (this.commands.length > 0) {
      const { resolved, command, rest } = matcher(stdinArgDict.positionals, this.commands)
      if (resolved) {
        command.execHandler({ positionals: rest, options: stdinArgDict.options })
        this.prompt.close()
        return
      }
    }
    this.execHandler(stdinArgDict)
    this.prompt.close()
  }

  execHandler(arg: { positionals: string[]; options: Record<string, string | null> }): boolean {
    const handlerarg = resolveHandlerArg({ positionals: this.positionals, options: this.options }, arg)
    if (handlerarg === false) {
      return false
    }
    // exec help
    return this.handler(handlerarg)
  }
}
