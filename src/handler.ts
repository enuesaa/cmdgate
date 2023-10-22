import { type PromptInterface } from './prompt'
import { Context } from './context'
import { Argument, type ArgumentConfig } from './argument'
import { Flag, type FlagConfig } from './flag'

export type Handlefn = (prompt: PromptInterface) => void

export class Handler {
  private _description: string = ''
  private _arguments: Argument[] = []
  private _flags: Flag[] = []
  private _handlefn: Handlefn = (prompt) => {}

  description(description: string) {
    this._description = description
  }

  argument(name: string, config: ArgumentConfig): Argument {
    const argument = new Argument(name, config)
    this._arguments.push(argument)
    return argument
  }

  flag(name: string, config: FlagConfig): Flag {
    const flag = new Flag(name, config)
    this._flags.push(flag)
    return flag
  }

  main(handlefn: Handlefn) {
    this._handlefn = handlefn
  }

  run(context: Context, prompt: PromptInterface) {
    const positionals = context.getPositionals()
    for (const argument of this._arguments) {
      argument.setNotDefined()
      if (positionals.length > 0) {
        argument.setValue(positionals[0])
        positionals.shift()
      }
    }

    const rawflags = context.getRawFlags()
    for (const flag of this._flags) {
      flag.setNotDefined()
      const flagname = flag.getName()
      if (rawflags.hasOwnProperty(flagname)) {
        flag.setValue(rawflags[flagname])
      }
    }

    this._handlefn(prompt)
  }
}
