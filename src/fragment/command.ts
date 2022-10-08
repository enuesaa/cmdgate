import { Option } from '@/fragment/option'
import { classify } from '@/util/classify'
import { Handler, HandlerArg } from '@/handler'

export type CommandArg = {
  description: string
  handler: Handler
  gate: {
    [key: string]: Command | Option
  }
}
export class Command {
  name: null | string
  description: string
  handler: Handler
  commands: Command[]
  options: Option[]

  constructor(arg: Partial<CommandArg>) {
    this.name = null
    this.description = arg.description ?? ''
    this.handler = arg.handler ?? ((arg: HandlerArg) => { console.log('default command handler'); return true })
    const { commands, options } = classify(arg.gate ?? {})
    this.commands = commands
    this.options = options
  }

  bindName(name: string): Command {
    this.name = name
    return this
  }

  execHandler(arg: HandlerArg): boolean {
    return this.handler(arg)
  }

  isMatch(value: string): boolean {
    return this.name === value
  }
}
