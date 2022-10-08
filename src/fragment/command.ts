import { Option } from '@/fragment/option'
import { classify } from '@/util/classify'
import { Handler, HandlerArg } from '@/handler'
import { Positional } from '@/fragment/positional'

export type CommandArg = {
  description: string
  handler: Handler
  gate: {
    [key: string]: Command | Option | Positional
  }
}
export class Command {
  name: null | string
  description: string
  handler: Handler
  commands: Command[]
  options: Option[]
  positionals: Positional[]

  constructor(arg: Partial<CommandArg>) {
    this.name = null
    this.description = arg.description ?? ''
    this.handler = arg.handler ?? ((arg: HandlerArg) => { console.log('default command handler'); return true })
    const { commands, options, positionals } = classify(arg.gate ?? {})
    this.commands = commands
    this.options = options
    this.positionals = positionals
  }

  bindName(name: string): Command {
    this.name = name
    return this
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

  isMatch(value: string): boolean {
    return this.name === value
  }
}
