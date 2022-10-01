import { Gateli } from './gateli'
import { Command, CommandHandler } from './command'
import { Option, OptionArg } from './option'
import { classify } from './classify'

export type CreateGateliArg = {
  _name: string,
  _description: string,
  _handler: CommandHandler,
  [key: string]: Command | Option | CommandHandler | string,
}
export const gateli = (arg: CreateGateliArg): Gateli => {
  const { name, description, handler, commands, options } = classify(arg)
  return new Gateli({ name, description, handler, commands, options })
}

export type CreateCommandArg = {
  _handler: CommandHandler,
  [key: string]: Option | Command | CommandHandler,
}
export const command = (arg: CreateCommandArg): Command => {
  const { commands, options, handler } = classify(arg)
  return new Command({ handler, commands, options })
}

export type CreateOptionArg = OptionArg
export const option = (arg: CreateOptionArg): Option => {
  return new Option(arg)
}

export const help = (arg) => {}
export const positional1 = (arg) => {}
export const positional2 = (arg) => {}
export const positionalArgs = (arg) => {}
export const optionValue = (arg) => {}
