import { Command } from './command'
import { Option } from './option'

type ClassifyArg = {
  [key: string]: Option | Command,
}
type ClassifyRes = {
  commands: Command[],
  options: Option[],
}
export const classifyCommandOrOption = (arg: ClassifyArg): ClassifyRes => {
  const commands: Command[] = [];
  const options: Option[] = [];

  for (const [key, value] of Object.entries(arg)) {
    if (value instanceof Command) {
      commands.push(value.setDefaultName(key));
    } else if (value instanceof Option) {
      options.push(value.setDefaultName(key));
    }
  }

  return { commands, options }
}
