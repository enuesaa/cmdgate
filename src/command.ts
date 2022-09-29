import { Option } from './option'

export type CommandHandler = () => ({});
export type CommandArg = {
  handler: CommandHandler,
  commands?: Command[],
  options?: Option[],
}
export class Command {
  handler: CommandHandler;
  commands: Command[];
  options: Option[];
  defaultName: null | string;
  name: null | string;

  constructor(arg: CommandArg) {
    this.handler = arg.handler
    this.options = arg.options ?? []
    this.commands = arg.commands ?? []
    this.name = null
  }

  setDefaultName(name: string): Command {
    this.defaultName = name;
    if (this.name === null) {
      this.name = name;
    }
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
