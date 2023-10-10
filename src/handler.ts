import { Prompt } from './prompt'
import { Context } from './context'

type ArgumentConfig = {
  description: string
}

type FlagConfig = {
  description: string
  alias: null | string
  required: boolean
}

export type Handlefn = (context: Context, prompt: Prompt) => void

export type HandlerConfig = {
  description: string
  arguments: Record<string, ArgumentConfig>
  flags: Record<string, FlagConfig>
  handlefn: Handlefn
}

export class Handler {
  private _description: string = ''
  private _arguments: Record<string, ArgumentConfig> = {}
  private _flags: Record<string, FlagConfig> = {}
  private _handlefn: Handlefn = (context, prompt) => {}

  description(description: string) {
    this._description = description
  }

  argument(name: string, config: ArgumentConfig) {
    this._arguments[name] = config
  }

  flag(name: string, config: FlagConfig) {
    this._flags[name] = config
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
}
