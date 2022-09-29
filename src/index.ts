import { Gateli } from './gateli'
import { Command, CommandArg } from './command'
import { Option, OptionArg } from './option'

export const gateli = (arg): Gateli => {
  const commands: Command[] = [];
  const options: Option[] = [];

  for (const [key, value] of Object.entries(arg)) {
    if (value instanceof Command) {
      commands.push(value.setDefaultName(key));
    } else if (value instanceof Option) {
      options.push(value.setDefaultName(key));
    }
  }

  return new Gateli({commands, options})
}

export const command = (arg: CommandArg): Command => {
  return new Command(arg)
}

export const option = (arg: OptionArg): Option => {
  return new Option(arg)
}
