import { Command, CommandHandler } from './command'
import { Option } from './option'

type ClassifyArg = {
  _handler?: CommandHandler,
  _name?: string,
  _description?: string,
  [key: string]: Command | Option | CommandHandler | string,
}
type ClassifyRes = {
  name: string,
  description: string,
  handler: CommandHandler | null,
  commands: Command[],
  options: Option[],
}
export const classify = (arg: ClassifyArg): ClassifyRes => {
  const commands: Command[] = [];
  const options: Option[] = [];
  const name = arg._name ?? '';
  const description = arg._description ?? ''
  const handler = arg._handler ?? null;

  for (const [key, value] of Object.entries(arg)) {
    if (key === '_handler') {
      continue;
    }
    if (value instanceof Command) {
      commands.push(value.setDefaultName(key));
    } else if (value instanceof Option) {
      options.push(value.setDefaultName(key));
    }
  }

  return { name, description, handler, commands, options }
}
