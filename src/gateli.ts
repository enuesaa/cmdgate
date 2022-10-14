import { Command } from '@/fragment/command'
import { Option } from '@/fragment/option'
import { Prompt } from '@/prompt'
import { classify } from '@/util/classify'
import { matcher } from '@/util/matcher'
import { resoveStdinArgs } from '@/util/processArgs'
import { Handler, Handle, resolveHandlerArg } from '@/handler'
import { Positional } from '@/fragment/positional'
import { Help } from '@/fragment/help'

export type GateliArg = {
  name: string
  description: string
  handler: Handler
  gate: {
    [key: string]: Command | Option | Positional | Help
  }
}

export class Gateli {
  name: string
  description: string
  handler: Handler
  commands: Command[]
  options: Option[]
  positionals: Positional[]
  prompt: Prompt
  help: Help

  constructor(arg: Partial<GateliArg>) {
    this.prompt = new Prompt()
    this.name = arg.name ?? ''
    this.description = arg.description ?? ''
    this.handler = arg.handler ?? ((handle: Handle) => {this.execHelp()})
    const { commands, options, positionals, help } = classify(arg.gate ?? {})
    this.commands = commands
    this.options = options
    this.positionals = positionals
    this.help = help ?? new Help({})
    if (this.help.message === null) {
      this.help.setDefaultHelpMessage({
        commands: this.commands,
        options: this.options,
        description: this.description,
        name: this.name,
      })
    }
  }

  exec() {
    const args = this.prompt.getArgs()
    const stdinArgDict = resoveStdinArgs(args)
    if ('--help' in stdinArgDict.options) {
      this.execHelp()
    } else {
      if (this.commands.length > 0) {
        const { resolved, command, rest } = matcher(stdinArgDict.positionals, this.commands)
        if (resolved) {
          command.execHandler({ positionals: rest, options: stdinArgDict.options }, this.prompt)
          this.prompt.close()
          return
        }
      }
      this.execHandler(stdinArgDict)
    }
    this.prompt.close()
  }

  execHandler(arg: { positionals: string[]; options: Record<string, string | null> }): void {
    const handlerarg = resolveHandlerArg({ positionals: this.positionals, options: this.options }, arg)
    if (handlerarg !== false) {
      this.handler({args: handlerarg, prompt: this.prompt})
    }
  }

  execHelp(): boolean {
    return this.help.exec()
  }
}
