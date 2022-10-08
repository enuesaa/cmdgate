import { Option } from '@/fragment/option'
import { classify } from '@/util/classify'

export type CommandHandler = () => {}

export type CommandArg = {
  description: string
  handler: CommandHandler | null
  gate: {
    [key: string]: Command | Option
  }
}

export class Command {
  protected name: null | string
  protected description: string
  protected handler: CommandHandler
  protected commands: Command[]
  protected options: Option[]

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

  execHandler() {
    this.handler()
  }

  isMatch(value: string): boolean {
    return this.name === value
  }
}

/**
 * @deprecated
 */
export const searchFromCommands = (commands: Command[], value: string): false | Command => {
  for (const command of commands) {
    if (command.isMatch(value)) {
      return command
    }
  }
  return false
}
