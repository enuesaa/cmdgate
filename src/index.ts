import { Gateli } from './gateli'
import { Command, CommandHandler } from './command'
import { Option, OptionArg } from './option'
import { classifyCommandOrOption } from './classify'

export type CreateGateliArg = {
  [key: string]: Option | Command,
}
export const gateli = (arg: CreateGateliArg): Gateli => {
  const { commands, options } = classifyCommandOrOption(arg)
  return new Gateli({ commands, options })
}

export type CreateCommandArg = {
  [key: string]: Option | Command,
}
export const command = (arg: CreateCommandArg, handler: CommandHandler): Command => {
  const { commands, options } = classifyCommandOrOption(arg)
  return new Command({ handler, commands, options })
}

export type CreateOptionArg = OptionArg
export const option = (arg: CreateOptionArg): Option => {
  return new Option(arg)
}
