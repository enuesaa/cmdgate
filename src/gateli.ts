import { Command, CommandHandler, searchFromCommands } from '@/command'
import { Option } from '@/option'
import { Prompt } from '@/prompt'

export class Gateli {
  protected _name: string;
  protected _description: string;
  protected _handler: CommandHandler;
  protected _commands: Command[];
  protected _options: Option[];
  protected _prompt: Prompt;

  constructor() {
    this._prompt = new Prompt()
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

  exec() {
    let args = this._prompt.getArgs()
    if (args.length === 0) {
      this.execRootCommand()
    } else {
      let commands = this._commands;
      for (const word of args) {
        if (this.isCliOption(word)) {
          break;
        }
        const command = searchFromCommands(commands, word);
        if (command === false) {
          console.log('not found')
        } else {
          command.execHandler()
        }
      }
    }
    this._prompt.close()
  }

  execRootCommand() {
    this._handler()
  }

  isCliOption(value: string): boolean {
    return value.startsWith('-')
  }
}