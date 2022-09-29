import { Command, searchFromCommands } from './command'
import { Option, searchFromOptions } from './option'
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
    let commands = this.commands;
    let options = this.options;
    let args = this.prompt.getArgs()
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
    // console.log(this.commands)
    this.prompt.close()
  }

  isCliOption(value: string): boolean {
    return value.startsWith('-')
  }
}