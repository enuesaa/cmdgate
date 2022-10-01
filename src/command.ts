import { Option } from '@/option'

export type CommandHandler = () => ({});
export type CommandArg = {
  description: string,
  handler: CommandHandler,
  commands?: Command[],
  options?: Option[],
}
export class Command {
  name: null | string;
  description: string;
  handler: CommandHandler;
  commands: Command[];
  options: Option[];

  constructor(arg: CommandArg) {
    this.name = null
    this.description = arg.description ?? ''
    this.handler = arg.handler
    this.commands = arg.commands ?? []
    this.options = arg.options ?? []
  }

  bindName(name: string): Command {
    this.name = name;
    return this
  }

  isMatch(value: string): boolean {
    return this.name === value;
  }
}

export const searchFromCommands = (commands: Command[], value: string): false | Command => {
  for (const command of commands) {
    if (command.isMatch(value)) {
      return command
    }
  }
  return false
}
