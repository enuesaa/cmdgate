import { Option } from '@/option'

export type CommandHandler = () => ({});

export class Command {
  protected _name: null | string;
  protected _description: string;
  protected _handler: CommandHandler;
  protected _commands: Command[];
  protected _options: Option[];

  constructor() {
    this._name = null
  }

  name(name: string): this {
    this._name = name
    return this
  }

  description(description: string): this {
    this._description = description
    return this
  }

  commands(commands: Command[]): this {
    this._commands = commands
    return this
  }

  addCommand(command: Command): this {
    this._commands.push(command)
    return this
  }

  options(options: Option[]): this {
    this._options = options
    return this
  }

  addOption(option: Option): this {
    this._options.push(option)
    return this
  }

  handler(handler: CommandHandler): this {
    this._handler = handler
    return this
  }

  bindName(name: string): Command {
    this._name = name;
    return this
  }

  execHandler() {
    this._handler()
  }

  isMatch(value: string): boolean {
    return this._name === value;
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
