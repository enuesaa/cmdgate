import { Option, OptionConfig } from '@/fragments/option'
import { Argument, ArgumentConfig } from '@/fragments/argument'
import { type Context } from '@/context'
import { type Prompt } from '@/prompt'

export type HandlerConfig = {
  description: string
  arguments: Argument[]
  options: Option[]
  handlefn: HandleFn
}
export type HandleFn = (context: Context, prompt: Prompt) => void

export class Handler {
  protected _description: string = ''
  protected _arguments: Argument[] = []
  protected _options: Option[] = []
  protected _handlefn: HandleFn = () => {}

  argument(name: string, config: Partial<ArgumentConfig>): this {
    this._arguments.push({ name, config: { description: '', ...config } })
    return this
  }

  option(name: string, config: Partial<OptionConfig>): this {
    this._options.push({ name, config: { description: '', alias: null, required: false, ...config } })
    return this
  }

  description(description: string): this {
    this._description = description
    return this
  }

  handle(handlefn: HandleFn): this {
    this._handlefn = handlefn
    return this
  }

  describeManifest(): HandlerConfig {
    return {
      description: this._description,
      arguments: this._arguments,
      options: this._options,
      handlefn: this._handlefn,
    }
  }
}
