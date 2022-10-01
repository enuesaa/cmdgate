import { Command, CommandHandler, searchFromCommands } from '@/command'
import { Option, searchFromOptions } from '@/option'
import { Prompt } from '@/prompt'

type GateliArg = {
  name: string,
  description: string,
  handler: CommandHandler,
  commands: Command[],
  options: Option[],
}
export class Gateli {
  name: string;
  description: string;
  handler: CommandHandler;
  commands: Command[];
  options: Option[];
  prompt: Prompt;

  constructor({ name, description, handler, commands, options }: GateliArg) {
    this.name = name;
    this.description = description;
    this.commands = commands;
    this.options = options;
    this.prompt = new Prompt();
    this.handler = handler ?? null;
  }

  exec() {
    let args = this.prompt.getArgs()
    if (args.length === 0) {
      this.execRootCommand()
    } else {
      let commands = this.commands;
      for (const word of args) {
        if (this.isCliOption(word)) {
          break;
        }
        const command = searchFromCommands(commands, word);
        if (command === false) {
          console.log('not found')
        } else {
          command.handler()
        }
      }
    }
    this.prompt.close()
  }

  execRootCommand() {
    this.handler()
  }

  isCliOption(value: string): boolean {
    return value.startsWith('-')
  }
}