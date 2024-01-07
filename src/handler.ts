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

  handle(handlefn: Handlefn) {
    this._handlefn = handlefn
  }

  describeHandler(): { description: string } {
    return {
      description: this._description,
    }
  }

  /**
   * @deprecated
   */
  run(context: Context, prompt: PromptInterface) {
    const positionals = context.positionals
    for (const argument of this._arguments) {
      argument._setNotDefined()
      if (positionals.length > 0) {
        argument._setValue(positionals[0])
        positionals.shift()
      }
    }

    const rawflags = context.rawFlags
    for (const flag of this._flags) {
      flag._setNotDefined()
      if (rawflags.hasOwnProperty(flag.name)) {
        flag._setValue(rawflags[flag.name])
      }
    }

    this._handlefn(prompt)
  }
}
