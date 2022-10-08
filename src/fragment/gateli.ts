import { Command, CommandHandler } from '@/fragment/command'
import { Option } from '@/fragment/option'
import { Prompt } from '@/prompt'
import { classify } from '@/util/classify'
import { matcher } from '@/util/matcher'

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
    const args = this.prompt.getArgs()
    const matched = matcher(args)
    // matched()
    this.prompt.close()
  }

  isCliOption(value: string): boolean {
    return value.startsWith('-')
  }
}
