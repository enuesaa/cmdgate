import { Option } from '@/fragment/option'
import { classify } from '@/util/classify'
import { Handler, HandlerArg, resolveHandlerArg } from '@/handler'
import { Positional } from '@/fragment/positional'
import { Help } from '@/fragment/help'

export type CommandArg = {
  description: string
  handler: Handler
  gate: {
    [key: string]: Command | Option | Positional | Help
  }
}
export class Command {
  name: null | string
  description: string
  handler: Handler
  commands: Command[]
  options: Option[]
  positionals: Positional[]
  help: Help

  constructor(arg: Partial<CommandArg>) {
    this.name = null
    this.description = arg.description ?? ''
    this.handler =
      arg.handler ??
      ((arg: HandlerArg) => {
        console.log('default command handler')
        return true
      })
    const { commands, options, positionals, help } = classify(arg.gate ?? {})
    this.commands = commands
    this.options = options
    this.positionals = positionals
    this.help = help ?? new Help({})
  }

  bindName(name: string): Command {
    this.name = name
    return this
  }

  execHandler(arg: { positionals: string[]; options: Record<string, string | null> }): boolean {
    const handlerarg = resolveHandlerArg({ positionals: this.positionals, options: this.options }, arg)
    if (handlerarg === false) {
      return false
    }
    return this.handler(handlerarg)
  }

  isMatch(value: string): boolean {
    return this.name === value
  }
}
