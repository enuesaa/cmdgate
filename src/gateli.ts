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
    let commands = this.commands;
    let options = this.options;
    let args = this.prompt.getArgs()
    if (args.length === 0) {
      this.handler()
    } else {
      for (const word of args) {
        if (this.isCliOption(word)) {
          const option = searchFromOptions(options, word);
          continue;
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

  isCliOption(value: string): boolean {
    return value.startsWith('-')
  }
}