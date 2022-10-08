import { Command } from '@/fragment/command'
import { Option } from '@/fragment/option'
import { Prompt } from '@/prompt'
import { classify } from '@/util/classify'
import { matcher } from '@/util/matcher'
import { resoveStdinArgs } from '@/util/stdinArgs'
import { Handler, HandlerArg } from '@/handler'
import { Positional } from '@/fragment/positional'

export type GateliArg = {
  name: string
  description: string
  handler: Handler
  gate: {
    [key: string]: Command | Option | Positional
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

  constructor(arg: Partial<GateliArg>) {
    this.prompt = new Prompt()
    this.name = arg.name ?? ''
    this.description = arg.description ?? ''
    this.handler = arg.handler ?? ((arg: HandlerArg) => { console.log('default gateli handler'); return true })
    const { commands, options, positionals } = classify(arg.gate ?? {})
    this.commands = commands
    this.options = options
    this.positionals = positionals
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

  execHandler(arg: {positionals: string[], options: Record<string, string|null>}): boolean {
    const handlerarg = {}
    if (this.positionals.length > 0) {
      for (const positional of this.positionals) {
        handlerarg[positional.name] = arg.positionals[positional.position - 1]
      }
    } else if (arg.positionals.length > 0) {
      console.error('invalid positional argument');
      return false
    }
    for (const option of this.options) {
      if (arg.options.hasOwnProperty(option.name)) {
        handlerarg[option.name] = arg.options[option.name]
      } else if (arg.options.hasOwnProperty(option.alias)) {
        handlerarg[option.name] = arg.options[option.alias]
      } else {
        handlerarg[option.name] = null
      }
    }
    return this.handler(handlerarg)
  }
}
