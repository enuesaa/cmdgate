import { Command } from './command'
import { Option } from './option'

type ClassifyArg = {
  [key: string]: Command | Option,
}
export const classify = (arg: ClassifyArg): {commands: Command[], options: Option[]} => {
  const commands: Command[] = [];
  const options: Option[] = [];

  for (const [name, value] of Object.entries(arg)) {
    if (value instanceof Command) {
      commands.push(value.bindName(name));
    } else if (value instanceof Option) {
      options.push(value.bindName(name));
    }
  }

  return { commands, options }
}
