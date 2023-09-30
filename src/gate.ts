import { Context } from './context'
import { Handler, Handlefn } from './handler'

type ArgumentConfig = {
  description: string
}

type FlagConfig = {
  description: string
  alias: null | string
  required: boolean
}

export class Gate {
  private _description: string = ''
  private _arguments: Record<string, ArgumentConfig> = {}
  private _flags: Record<string, FlagConfig> = {}

  description(description: string) {
    this._description = description
  }

  argument(name: string, config: ArgumentConfig) {
    this._arguments[name] = config
  }

  flag(name: string, config: FlagConfig) {
    this._flags[name] = config
  }

  handle(handlefn: Handlefn): Handler {
    return new Handler(this, handlefn)
  }

  /**
   * should return parsed objects
   */
  parse(context: Context) {
    const parsed: Record<string, any> = {}

    Object.keys(this._flags).map(name => {
      parsed[name] = context.getFlag(name)
    })

    return parsed
  }
}
