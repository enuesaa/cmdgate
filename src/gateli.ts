import { Command, searchFromCommands } from './command'
import { Option } from './option'
import { Prompt } from './prompt'

type GateliArg = {
  commands: Command[],
  options: Option[],
}
export class Gateli {
  commands: Command[];
  options: Option[];
  prompt: Prompt;

  constructor({ commands, options }: GateliArg) {
    this.commands = commands;
    this.options = options;
    this.prompt = new Prompt();
  }

  exec() {
    const args = this.prompt.getArgs()
    if (args.length > 0) {
      const arg = args[0]
      if (this.isCliOption(arg)) {
      } else {
        const command = searchFromCommands(this.commands, arg);
        if (command === false) {
          console.log('not found')
        } else {
          command.handler()
        }
      }
    }
    // console.log(this.commands)
    this.prompt.close()
  }

  isCliOption(value: string): boolean {
    return value.startsWith('-')
  }
}