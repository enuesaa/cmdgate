import { Command, CommandHandler, searchFromCommands } from '@/command'
import { Option } from '@/option'
import { Prompt } from '@/prompt'
import { classify } from '@/util/classify'

export type GateliArg = {
  name: string
  description: string
  handler: CommandHandler
  gate: {
    [key: string]: Command | Option
  }
}

export class Gateli {
  protected name: string
  protected description: string
  protected handler: CommandHandler | null
  protected commands: Command[]
  protected options: Option[]
  protected prompt: Prompt

  constructor(arg: Partial<GateliArg>) {
    this.prompt = new Prompt()
    this.name = arg.name ?? ''
    this.description = arg.description ?? ''
    this.handler = arg.handler ?? null
    const { commands, options } = classify(arg.gate ?? {})
    this.commands = commands
    this.options = options
  }

  exec() {
    let args = this.prompt.getArgs()
    if (args.length === 0) {
      this.execRootCommand()
    } else {
      let commands = this.commands
      for (const word of args) {
        if (this.isCliOption(word)) {
          break
        }
        const command = searchFromCommands(commands, word)
        if (command === false) {
          console.log('not found')
        } else {
          command.execHandler()
        }
      }
    }
    this.prompt.close()
  }

  execRootCommand() {
    this.handler()
  }

  isCliOption(value: string): boolean {
    return value.startsWith('-')
  }
}
