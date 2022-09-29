import { Gateli } from './gateli'
import { Command, CommandHandler } from './command'
import { Option, OptionArg } from './option'

const classify = (arg: {[key: string]: Option | Command}): {commands: Command[], options: Option[]} => {
  const commands: Command[] = [];
  const options: Option[] = [];
  for (const [key, value] of Object.entries(arg)) {
    if (value instanceof Command) {
      commands.push(value.setDefaultName(key));
    } else if (value instanceof Option) {
      options.push(value.setDefaultName(key));
    }
  }
  return {commands, options}
}

export type CreateGateliArg = {
  [key: string]: Option | Command,
}
export const gateli = (arg: CreateGateliArg): Gateli => {
  const {commands, options} = classify(arg)
  return new Gateli({commands, options})
}

export type CreateCommandArg = {
  [key: string]: Option | Command,
}
export const command = (arg: CreateCommandArg, handler: CommandHandler): Command => {
  const {commands, options} = classify(arg)
  return new Command({handler, commands, options})
}

export type CreateOptionArg = OptionArg
export const option = (arg: CreateOptionArg): Option => {
  return new Option(arg)
}
