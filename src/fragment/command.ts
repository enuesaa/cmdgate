import { Option } from '@/fragment/option'
import { classify } from '@/util/classify'

export type HandlerArg = {
  positionals: string[]
  options: {
    [key: string]: string | null
  }
}
export type CommandHandler = (arg: HandlerArg) => boolean

export type CommandArg = {
  description: string
  handler: CommandHandler
  gate: {
    [key: string]: Command | Option
  }
}
export class Command {
  name: null | string
  description: string
  handler: CommandHandler | null
  commands: Command[]
  options: Option[]

  constructor(arg: Partial<CommandArg>) {
    this.name = null
    this.description = arg.description ?? ''
    this.handler = arg.handler ?? null
    const { commands, options } = classify(arg.gate ?? {})
    this.commands = commands
    this.options = options
  }

  bindName(name: string): Command {
    this.name = name
    return this
  }

  execHandler(arg: HandlerArg) {
    const handler = this.handler ?? ((arg: HandlerArg) => true)
    handler(arg)
  }

  isMatch(value: string): boolean {
    return this.name === value
  }
}
