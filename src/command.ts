import { Option } from './option'

export type CommandArg = {
  handler: () => ({}),
  options?: Record<string, Option>
  name?: string,
}
export class Command {
  handler: () => ({});
  options: Record<string, Option>;
  defaultName: null | string;
  name: null | string;

  constructor(arg: CommandArg) {
    this.name = arg.name ?? null
    this.handler = arg.handler
    this.options = arg.options ?? {}
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
