import { Prompt } from './prompt'
import { Context } from './context'
import { Argument, type ArgumentConfig } from './argument'
import { Flag, type FlagConfig } from './flag'

export type Handlefn = (context: Context, prompt: Prompt) => void

export type HandlerConfig = {
  description: string
  arguments: Argument[]
  flags: Flag[]
  handlefn: Handlefn
}

export class Handler {
  private _description: string = ''
  private _arguments: Argument[] = []
  private _flags: Flag[] = []
  private _handlefn: Handlefn = (context, prompt) => {}

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

  describeConfig(): HandlerConfig {
    return {
      description: this._description,
      arguments: this._arguments,
      flags: this._flags,
      handlefn: this._handlefn,
    }
  }

  run(context: Context, prompt: Prompt) {
    // pass value to argument 
    // pass value to flag

    // run handlefn
  }
}
